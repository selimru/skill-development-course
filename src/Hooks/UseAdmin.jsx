import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const UseAdmin = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminpending } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: () => {
            const res = axiosSecure.get(`/api/v1/getUsers/admin/${user?.email}`)
            return res
        }

    })

    return [isAdmin, isAdminpending]
};

export default UseAdmin;