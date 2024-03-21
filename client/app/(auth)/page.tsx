
"use client"
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex'>
      <div className='w-full h-full mt-16'>
        <Image alt='video-conf' className='absolute left-[15%] h-full rounded-2xl' 
        src={'https://cdn.dribbble.com/userupload/6878463/file/original-86789c49ebdc9441f2d5a5066b3486a3.png?resize=1200x900'} 
        width={5000} height={5000} />
        
      </div>
    </div>

  )
}

export default page

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { formSchema } from "@/utils/schema"
// import { useSocket } from "@/context/SocketProviders"
// import { useEffect } from "react"
// import useSocketEvent from "@/hooks/useSocketEvents"

// const page = () => {
//   const socket = useSocket();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       roomNumber: ""
//     },
//   })

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     const { email, roomNumber } = values
//     socket.emit('room:join', { email, room: roomNumber })
//     form.reset();
//   }

  // useSocketEvent();

//   return (
//     <div className="p-10 lg:w-1/3 sm:w-2/4">

//       <h2 className="mb-7 mt-5 text-2xl font-semibold">LOGIN TO YOUR ROOM</h2>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your email" {...field} />
//                 </FormControl>

//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="roomNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Room number</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your room number" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Button variant="default" className="bg-blue-500 px-10 rounded-xl hover:bg-blue-400" type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   )
// }

// export default page;

const Arrow = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg>
  )
}