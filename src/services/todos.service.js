import httpService from "./http.service"
const todosEndepoint = "todos/"
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndepoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        })
        return data
    },
    create: async (info) => {
        const { data } = await httpService.post(todosEndepoint, {
            title: info,
            completed: false,
        })
        return data
    },
}
export default todosService
