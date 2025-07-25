<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card
      class="q-pa-lg shadow-2 rounded-borders"
      style="min-width: 350px; width: 100%; max-width: 400px"
    >
      <q-card-section class="row items-center q-gutter-sm q-mb-md">
        <q-avatar size="50px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        <div>
          <div class="text-h6">Prototipo</div>
          <div class="text-subtitle2 text-grey-7">Inicia sesión para continuar</div>
        </div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input filled v-model="username" label="Usuario" dense rounded standout />
        <q-input
          filled
          v-model="password"
          type="password"
          label="Contraseña"
          dense
          rounded
          standout
        />
      </q-card-section>

      <q-card-actions class="q-mt-md" align="right">
        <q-btn color="primary" label="Entrar" unelevated class="full-width" @click="irALogin" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const router = useRouter()
    const $q = useQuasar()

    const username = ref('')
    const password = ref('')

    const irALogin = () => {
      $q.notify({
        type: 'positive',
        message: 'Bienvenido',
      })

      router.push('/dashboard')
    }

    return {
      username,
      password,
      irALogin,
    }
  },
}
</script>
