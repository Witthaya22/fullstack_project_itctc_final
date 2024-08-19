export default defineNuxtPlugin(async () => {
    const { checkAuth, checkAdmin } = useAuth()
    await Promise.all([checkAuth(), checkAdmin()])
    
})