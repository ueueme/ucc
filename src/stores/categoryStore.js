import {getCategoryAPI} from "@/apis/layout";
// vite配置了自动导入依赖
export const useCategoryStore = defineStore('category',()=>{
    const categoryList = ref([]);
    const getCategory = async () => {
        let res = await getCategoryAPI();
        categoryList.value = res.result;
    }
    onMounted(()=> getCategory())
    return{
        categoryList,
        getCategory
    }
})
