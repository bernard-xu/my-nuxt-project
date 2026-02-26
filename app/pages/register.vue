<script setup lang="ts">
definePageMeta({ layout: false })

const { register } = useAuth()

const form = reactive({ name: '', email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  loading.value = true
  try {
    await register(form.name, form.email, form.password)
  }
  catch (err: unknown) {
    const e = err as { data?: { statusMessage?: string }, message?: string }
    error.value = e?.data?.statusMessage || e?.message || '注册失败'
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
            创建账号
          </h1>
          <p class="text-sm text-muted mt-1">
            填写以下信息完成注册
          </p>
        </div>
      </template>

      <UForm :state="form" class="space-y-4" @submit="handleRegister">
        <UFormField label="姓名" name="name">
          <UInput
            v-model="form.name"
            placeholder="您的姓名"
            icon="i-lucide-user"
            class="w-full"
            required
          />
        </UFormField>

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
            placeholder="至少 6 位"
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
          注册
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-center text-sm text-muted">
          已有账号？
          <NuxtLink to="/login" class="text-primary font-medium hover:underline">
            立即登录
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>
