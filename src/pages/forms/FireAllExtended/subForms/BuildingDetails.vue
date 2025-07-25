<template>
  <q-expansion-item
    group="form-sections"
    icon="home"
    label="Building Construction Details"
    header-class="text-primary text-weight-bold"
  >
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md">
          <!-- Number of storeys -->
          <q-select
            filled
            v-model="form.storeys"
            :options="storeysOptions"
            label="Number of storeys"
            dense
            standout
          />

          <!-- External Walls -->
          <div>
            <q-select
              filled
              v-model="form.externalWalls"
              :options="externalWallsOptions"
              label="External Walls"
              dense
              standout
              @update:model-value="handleExternalWallsChange"
            />
            <q-input
              v-if="form.externalWalls === 'Other'"
              filled
              v-model="form.externalWallsOther"
              label="Please specify external walls"
              dense
              standout
              class="q-mt-sm"
            />
          </div>

          <!-- Roof -->
          <div>
            <q-select
              filled
              v-model="form.roof"
              :options="roofOptions"
              label="Roof"
              dense
              standout
              @update:model-value="handleRoofChange"
            />
            <q-input
              v-if="form.roof === 'Other'"
              filled
              v-model="form.roofOther"
              label="Please specify roof type"
              dense
              standout
              class="q-mt-sm"
            />
          </div>

          <!-- Ceiling -->
          <div>
            <q-select
              filled
              v-model="form.ceiling"
              :options="ceilingOptions"
              label="Ceiling"
              dense
              standout
              @update:model-value="handleCeilingChange"
            />
            <q-input
              v-if="form.ceiling === 'Other'"
              filled
              v-model="form.ceilingOther"
              label="Please specify ceiling type"
              dense
              standout
              class="q-mt-sm"
            />
          </div>

          <!-- Floor -->
          <div>
            <q-select
              filled
              v-model="form.floor"
              :options="floorOptions"
              label="Floor"
              dense
              standout
              @update:model-value="handleFloorChange"
            />
            <q-input
              v-if="form.floor === 'Other'"
              filled
              v-model="form.floorOther"
              label="Please specify floor type"
              dense
              standout
              class="q-mt-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive } from 'vue';

// Form data
const form = reactive({
  storeys: '',
  externalWalls: '',
  externalWallsOther: '',
  roof: '',
  roofOther: '',
  ceiling: '',
  ceilingOther: '',
  floor: '',
  floorOther: ''
});

// Options
const storeysOptions = ['1', '2', '3', '4', '5+'];
const externalWallsOptions = ['Concrete', 'Densglass', 'Wooden Structure', 'Other'];
const roofOptions = ['Roof Tiles', 'Shingles', 'Eterniet', 'Aluminium', 'concrete', 'Other'];
const ceilingOptions = ['Gypsum Board', 'Wooden Structure', 'PVC/Tiles (schrootjes)', 'Other'];
const floorOptions = ['Ceramic Tiles', 'Carpet', 'Wooden Deck', 'Rubberoid Tiles (linolium)', 'Other'];

// Handlers para limpiar campos "Other" cuando no son necesarios
const handleExternalWallsChange = (val) => {
  if (val !== 'Other') form.externalWallsOther = '';
};
const handleRoofChange = (val) => {
  if (val !== 'Other') form.roofOther = '';
};
const handleCeilingChange = (val) => {
  if (val !== 'Other') form.ceilingOther = '';
};
const handleFloorChange = (val) => {
  if (val !== 'Other') form.floorOther = '';
};

// Exponer datos y métodos al componente padre
defineExpose({
  formData: form,
  resetForm: () => {
    Object.assign(form, {
      storeys: '',
      externalWalls: '',
      externalWallsOther: '',
      roof: '',
      roofOther: '',
      ceiling: '',
      ceilingOther: '',
      floor: '',
      floorOther: ''
    });
  }
});
</script>