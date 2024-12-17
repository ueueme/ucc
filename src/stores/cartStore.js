import { defineStore } from "pinia";
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart";
import { useUserStore } from "./userStore";

// 定义一个名为 "cart" 的 store
export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);
 
    const userStore = useUserStore();
    //用computed映射一下token，方便数据转换，响应式更新
    const isLogin = computed(() => userStore.userInfo.token);

    const addCart = async (goods) => {
      if (isLogin.value) {
        //登录之后加入购物车逻辑
        await insertCartAPI(goods);
        updateLoginCartList();
      } else {
        //判断商品是否在购物车
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count += goods.count;
        } else {
          cartList.value.push(goods);
        }
      }
    };
    //获取最新的购物车列表
    const updateNewList = async () => {
      //调用获取购物车列表接口
      const res = await findNewCartListAPI();
      //覆盖本地购物车
      cartList.value = res.result;
    };

    // 删除购物项
    const delCart = async (skuId) => {
      if (isLogin.value) {
        //登录之后加入购物车逻辑
        console.log([skuId]);
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用splice删除找到的项，原数组改变
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };
    // 计算属性
    // 1. 总的数量 所有项的count之和
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );
    // 2. 总价 所有项的count*price之和
    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    // 全选功能
    const checkAll = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected));
    };

    //是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 4. 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 5. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    // 获取登录后最新购物车列表action
    const updateLoginCartList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };
    //修改购物项
    const updateCartItem = async (goods) => {
      const { skuId, count, selected } = goods;
      if (isLogin.value) {
        await updateCartItem(skuId, { count, selected });
      }
    };

    return {
      //暴露属性
      allCount,
      allPrice,
      cartList,
      isAll,
      selectedCount,
      selectedPrice,
      //暴露方法
      checkAll,
      addCart,
      delCart,
      updateLoginCartList,
      updateCartItem,
      updateNewList,
    };
  },
  {
    persist: true,
  }
);
