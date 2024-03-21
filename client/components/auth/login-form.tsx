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

import { loginSchema } from '@/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { useLogin } from '@/actions/useAuth'
import { useRouter } from 'next/navigation'

const LoginForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [isPending, startTransition] = useTransition();
  const { login, isError, isSuccess, isLoading } = useLogin()

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values)
    setError("")
    setSuccess("")
    
    startTransition(async () => {
      const { error, success } = await login(values);
      console.log(error)
      if (error) setError(error)
      if (success) {setSuccess(success); router.push('/')}
    })

    form.reset()
  }

  return (
    <div>
      <CardWrapper
        headerLabel='Welcome back'
        backButtonHref='/sign-up'
        backButtonLabel={`Don't have an account`}
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='johndoe'
                        disabled={isPending}
                        type='text'
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
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              variant={'primary'}
              disabled={isPending}
              className='w-full'
              type='submit'
            >Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default LoginForm