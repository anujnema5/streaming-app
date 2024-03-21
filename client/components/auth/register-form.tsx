'use client'

import * as z from 'zod'
import React, { useState, useTransition } from 'react'
import CardWrapper from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { useRegister } from '@/actions/useAuth'
import { useSignUpMutation } from '@/features/authApiSlice'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [login, { isError, isLoading, isSuccess }] = useSignUpMutation();
  const { register } = useRegister();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const { success, error } = await register(values);
      if (error) setError(error)
      
      if (success) {
        setSuccess(success);
        form.reset()
        router.push('/')
      }

    })

  }


  return (
    <>
      <CardWrapper
        headerLabel='Create an account'
        backButtonHref='/sign-in'
        backButtonLabel='Already have an account'
        showSocial
      >
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >

            <div className="space-y-4">
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='John Doe'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='johndoe'
                        disabled={isPending}
                        type='username'
                        className=''
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='johndoe@mail.com'
                        disabled={isPending}
                        type='email'
                        className=''
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='password'
                        placeholder='*******' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='password'
                        placeholder='*******' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              variant={'primary'}
              disabled={isPending}
              className='w-full'
              type='submit'
            >Create an account
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  )
}

export default RegisterForm