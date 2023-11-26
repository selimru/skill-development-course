import { useLoaderData } from "react-router-dom"
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useCourses from "../../../../Hooks/useCourses";
import { useForm } from "react-hook-form";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateCourse = () => {
    const course = useLoaderData()
    const { _id, title, image, name, email, price, description } = course
    const [, refetch] = useCourses()
    const axiosSecure = useAxiosSecure()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const courseInfo = {
                name: data.name,
                image: res.data.data.display_url,
                title: data.title,
                email: data.email,
                price: data.price,
                description: data.description
            }
            axiosSecure.patch(`/api/v1/updateCourse/${_id}`, courseInfo)
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Item updated successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    refetch()
                    reset()
                })
        }
    }


    return (
        <div>
            <h3 className=' text-center font-semibold text-3xl'>UPDATE AN COURSE</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 justify-center mx-auto w-full">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Title" />
                    </div>
                    <TextInput defaultValue={title} {...register("title", { required: true })} id="small" type="text" sizing="sm" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Name" />
                    </div>
                    <TextInput defaultValue={name} {...register("name", { required: true })} id="small" type="text" sizing="sm" readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Email" />
                    </div>
                    <TextInput defaultValue={email} {...register("email", { required: true })} id="small" type="email" sizing="sm" readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Price*" />
                    </div>
                    <TextInput defaultValue={price} {...register("price", { required: true })} id="base" type="number" sizing="md" />
                </div>
                <div >
                    <div className="mb-2 block">
                        <Label htmlFor="large" value="Description*" />
                    </div>
                    <Textarea defaultValue={description} {...register("description", { required: true })} className='h-[200px]' id="large" type="text" sizing="lg" />
                </div>
                <div className=' flex flex-col md:flex-row lg:flex-row w-full md:items-center md:justify-between gap-5'>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        name="image"
                        id="image"
                    />
                </div>
                <Button type='submit'>Add Course</Button>
            </form>
        </div>
    );
};

export default UpdateCourse;