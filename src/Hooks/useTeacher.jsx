import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTeacher = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isTeacher, isPending: isATeacherPending } = useQuery({
        queryKey: ['teacher', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getUser/teacher/${user?.email}`)
            console.log(res.data.teacher);
            return res.data.teacher
        }

    })

    return [isTeacher, isATeacherPending]
};

export default useTeacher;