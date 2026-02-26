<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
const loading = ref(false)

async function handleLogout() {
  loading.value = true
  await logout()
}
</script>

<template>
  <UContainer class="py-12 max-w-2xl">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold">
            Dashboard
          </h1>
          <UButton
            color="neutral"
            variant="soft"
            icon="i-lucide-log-out"
            :loading="loading"
            @click="handleLogout"
          >
            退出登录
          </UButton>
        </div>
      </template>

      <div class="space-y-6">
        <div class="flex items-center gap-4">
          <UAvatar
            :alt="user?.name"
            size="xl"
          />
          <div>
            <p class="text-lg font-semibold">
              {{ user?.name }}
            </p>
            <p class="text-sm text-muted">
              {{ user?.email }}
            </p>
          </div>
        </div>

        <USeparator />

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p class="text-xs text-muted mb-1">
              用户 ID
            </p>
            <p class="font-mono text-sm break-all">
              {{ user?.id }}
            </p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p class="text-xs text-muted mb-1">
              注册时间
            </p>
            <p class="text-sm">
              {{ user?.createdAt ? new Date(user.createdAt).toLocaleString('zh-CN') : '-' }}
            </p>
          </div>
        </div>

        <UAlert
          color="success"
          variant="soft"
          title="登录成功"
          description="您已通过 JWT 认证，Token 存储在 httpOnly Cookie 中。"
          icon="i-lucide-shield-check"
        />
      </div>
    </UCard>
  </UContainer>
</template>
