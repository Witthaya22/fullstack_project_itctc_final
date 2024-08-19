export default defineNuxtRouteMiddleware((to, from) => {
  const { admin } = useAuth()
  if(!admin.value){
    return navigateTo('/admin',{
      redirectCode: 302
    })
  }
})


