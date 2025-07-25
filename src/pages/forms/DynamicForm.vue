<template>
  <q-expansion-item
    :icon="icon"
    :label="title"
    expand-separator
    :default-opened="defaultOpened"
    class="q-mb-md"
  >
    <q-card
      class="q-pa-lg shadow-2"
      style="max-width: 900px; margin: auto; height: 70vh; display: flex; flex-direction: column"
    >
      <q-card-section v-if="showHeader">
        <div class="text-h6">{{ headerTitle }}</div>
        <div class="text-subtitle2 text-grey-7" v-if="headerSubtitle">
          {{ headerSubtitle }}
        </div>
      </q-card-section>

      <div style="overflow-y: auto; flex: 1">
        <q-form class="q-gutter-md q-mt-md">
          <template v-for="(field, index) in fields" :key="index">
            <q-input
              v-if="field.type === 'input'"
              filled
              v-model="formData[field.model]"
              :label="field.label"
              :dense="field.dense !== false"
              :standout="field.standout !== false"
              :type="field.inputType || 'text'"
            />

            <q-select
              v-else-if="field.type === 'select'"
              filled
              v-model="formData[field.model]"
              :label="field.label"
              :options="field.options"
              :dense="field.dense !== false"
              :standout="field.standout !== false"
              @update:model-value="handleSelectChange(field.model, $event)"
            />

            <div v-else-if="field.type === 'radio'" class="q-pa-xs q-gutter-xs">
              <div class="q-gutter-xs">
                <p>{{ field.label }}</p>
                <q-radio
                  v-for="option in field.options"
                  :key="option.value"
                  dense
                  v-model="formData[field.model]"
                  :val="option.value"
                  :label="option.label"
                />
              </div>
              <div class="q-px-sm q-pt-xs" v-if="field.showSelection">
                Your selection is: <strong>{{ formData[field.model] }}</strong>
              </div>
            </div>

            <!-- Conditional Input (appears when a select has 'Other' option selected) -->
            <q-input
              v-if="field.showIfOther && formData[field.model] === 'Other'"
              filled
              v-model="formData[field.otherModel]"
              :label="field.otherLabel || 'Please specify'"
              dense
              standout
              class="q-mt-sm"
            />
          </template>
        </q-form>
      </div>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: 'fireplace'
  },
  title: {
    type: String,
    required: true
  },
  defaultOpened: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  headerTitle: {
    type: String,
    default: ''
  },
  headerSubtitle: {
    type: String,
    default: ''
  },
  fields: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(field => {
        const validTypes = ['input', 'select', 'radio']
        return validTypes.includes(field.type)
      })
    }
  },
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

// Initialize form data
const formData = reactive({})

// Set initial values
props.fields.forEach(field => {
  formData[field.model] = props.initialData[field.model] || (field.type === 'radio' ? field.options[0].value : '')
  if (field.showIfOther) {
    formData[field.otherModel] = props.initialData[field.otherModel] || ''
  }
})

// Handle select changes (for 'Other' options)
const handleSelectChange = (model, value) => {
  formData[model] = value
}

// Watch for changes and emit updates
watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

// Expose form data for parent component access
defineExpose({
  formData
})
</script>