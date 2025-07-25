<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/NewIndia.png" />
          </q-avatar>
          New India
        </q-toolbar-title>
        <q-btn flat dense icon="logout" @click="logout" to="/login" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered style="margin-top: 73px">
      <q-list>
        <q-item-section>
          <q-btn color="primary" push to="/" no-caps class="q-ml-md q-mr-md">
            <q-icon name="dashboard" class="custom-icon" />
            <span class="custom-label">Dashboard</span>
          </q-btn>
        </q-item-section>

        <q-item>
          <q-item-section>
            <q-btn-dropdown
              color="primary"
              label="Formularios"
              icon="list_alt"
              push
              no-caps
              @click="onMainClick"
            >
              <q-list>
                <q-item
                  v-for="form in formularios"
                  :key="form.ruta"
                  clickable
                  v-close-popup
                  @click="goTo(form.ruta)"
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <q-icon :name="form.icono" color="primary" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ form.titulo }}</q-item-label>
                    <q-item-label caption>{{ form.descripcion }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="  bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title style="display:flex; align-items: center;
    justify-content: center; ">
          <q-avatar>
            <img src="../assets/NewIndia.png" />
          </q-avatar>
          <div>New India</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leftDrawerOpen = ref(false)

const formularios = [
  {
    titulo: 'FireOnly',
    descripcion: 'Evaluación de riesgos por incendio',
    icono: 'whatshot',
    ruta: '/FireOnly',
  },
  {
    titulo: 'Fire All Extended',
    descripcion: 'Plan de acción ante emergencias',
    icono: 'directions_run',
    ruta: '/FireAll',
  },
  {
    titulo: 'Smart Cas',
    descripcion: 'Inspección eléctrica',
    icono: 'bolt',
    ruta: '/SmartCas',
  },
  {
    titulo: 'Smart Economy Cas',
    descripcion: 'Registro de simulacros',
    icono: 'event',
    ruta: '/SmartEconomyCas',
  },
]

function goTo(ruta) {
  router.push(ruta)
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  router.push('/login')
  console.log(logout, 'holaaaa')
}
</script>

<style>
.custom-icon {
  margin-right: 10px;
}

.custom-label {
  margin-right: 40px;
}
</style>
