<script setup lang="ts">
definePageMeta({ layout: false })

const { login } = useAuth()

const form = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await login(form.email, form.password)
  }
  catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string }, message?: string }
    error.value = e?.data?.statusMessage || e?.message || '登录失败'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold">
            登录
          </h1>
          <p class="text-sm text-muted mt-1">
            欢迎回来，请输入您的账号信息
          </p>
        </div>
      </template>

      <UForm :state="form" class="space-y-4" @submit="handleLogin">
        <UFormField label="邮箱" name="email">
          <UInput
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            icon="i-lucide-mail"
            class="w-full"
            required
          />
        </UFormField>

        <UFormField label="密码" name="password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            icon="i-lucide-lock"
            class="w-full"
            required
          />
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :description="error"
          icon="i-lucide-circle-alert"
        />

        <UButton
          type="submit"
          class="w-full justify-center"
          :loading="loading"
        >
          登录
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-center text-sm text-muted">
          还没有账号？
          <NuxtLink to="/register" class="text-primary font-medium hover:underline">
            立即注册
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
