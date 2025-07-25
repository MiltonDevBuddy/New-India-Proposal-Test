<template>
  <q-expansion-item
    group="form-sections"
    icon="summarize"
    label="Summary and Conditions"
    header-class="text-primary text-weight-bold"
  >
    <q-card>
      <q-card-section>
        <div class="q-gutter-y-lg">
          <div v-if="formData.insuranceHistory" class="q-pa-sm">
            <p class="text-weight-bold">Insurance & Claim History:</p>
            <p>{{ formData.insuranceHistory }}</p>
          </div>

          <div v-if="formData.signature" class="q-pa-sm">
            <p class="text-weight-bold">Signature:</p>
            <p>{{ formData.signature }}</p>
          </div>

          <div class="q-pa-sm">
            <p class="text-weight-bold">Standard Policy Conditions:</p>
            <ul>
              <li>Standard NIA policy terms & conditions as per cover</li>
            </ul>
          </div>

          <div class="q-pa-sm">
            <p class="text-weight-bold">Special Conditions:</p>
            <q-select
              filled
              v-model="localState.specialConditions"
              :options="filteredSpecialConditionOptions"
              label="Select special conditions"
              multiple
              use-chips
              dense
              standout
            />

            <template v-if="automaticConditions.length > 0">
              <p class="q-mt-md text-weight-bold">Automatic Conditions:</p>
              <ul>
                <li v-for="(condition, index) in automaticConditions" :key="index">
                  {{ condition }}
                </li>
              </ul>
            </template>

            <q-input
              v-model="localState.additionalClause"
              label="Additional Clause"
              dense
              filled
              class="q-mt-md"
            />
          </div>

          <div v-if="showMortgageClause" class="q-pa-sm">
            <p class="text-weight-bold">Mortgage Clause in Favor of:</p>
            <p>{{ formData.mortgageInstitution || formData.mortgageInstitutionOther }}</p>
          </div>

          <div class="q-pa-sm">
            <p class="text-weight-bold">Excess:</p>

            <div
              v-if="formData.buildingOccupation === 'Fire only'"
              class="row items-center q-gutter-sm"
            >
              <span>Excess Applicable: Awg.</span>
              <q-input
                v-model="localState.excessAmount"
                type="number"
                dense
                filled
                style="width: 120px"
              />
              <span>On each and every claim</span>
            </div>

            <div v-if="formData.buildingOccupation !== 'Fire only'" class="q-gutter-y-sm">
              <div class="row items-center q-gutter-sm">
                <span>Excess for catastrophic perils: 2% of total sum insured</span>
              </div>
              <div class="row items-center q-gutter-sm">
                <span>Excess Any Other Perils: Awg.</span>
                <q-input
                  v-model="localState.excessAmount"
                  type="number"
                  dense
                  filled
                  style="width: 120px"
                />
                <span>On each and every claim</span>
              </div>
            </div>

            <div v-if="hasSolarPanels" class="row items-center q-gutter-sm q-mt-sm">
              <span>Excess Solar Panels: Awg. 1,500.00 each and every claim</span>
            </div>
          </div>

          <div v-if="formData.buildingOccupation === 'Smart Economy Cas'" class="q-pa-sm">
            <p class="text-weight-bold">Special Conditions:</p>
            <ul>
              <li>No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)</li>
              <li v-if="formData.indexRequired === 'Yes'">Subject to Index Clause</li>
              <li v-if="hasSolarPanels">Subject to Solar Panels Clause</li>
              <li v-if="hasLossOfRent">Subject to Loss of Rent Clause</li>
            </ul>
          </div>

          <div v-if="isCFTOrCFTE" class="q-pa-sm">
            <p class="text-weight-bold">Special Conditions:</p>
            <ul>
              <li>Acts of Terrorism and Malicious Damage are excluded from cover</li>
              <li>Subject to Infectious Disease Exclusion Clause</li>
              <li>Subject to Dynamo Exclusion Clause</li>
              <li>Subject to CFT 5 Clause</li>
              <li>Police Report Must</li>
              <li>No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)</li>
              <li v-if="formData.indexRequired === 'Yes'">Subject to Index Clause</li>
              <li v-if="hasSolarPanels">Subject to Solar Panels Clause</li>
              <li v-if="hasLossOfRent">Subject to Loss of Rent Clause</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { computed, reactive, defineExpose} from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  }
})

const localState = reactive({
  specialConditions: [],
  additionalClause: '',
  excessAmount: ''
})

const resetForm = () => {
  localState.specialConditions = []
  localState.additionalClause = ''
  localState.excessAmount = ''
  console.log('Summary form reset successfully')
}

defineExpose({ resetForm })

const allSpecialConditionOptions = [
  'Subject to special conditions relating to buildings in course of construction',
  'Acts of Terrorism and Malicious Damage are excluded from cover',
  'Subject to Reinstatement Value Clause',
  'Subject to Infectious Disease Exclusion Clause',
  'Subject to Dynamo Exclusion Clause',
  'Subject to Risk Prevention warranty',
]

const hasLossOfRent = computed(() => {
  return props.formData.specialCoverages?.includes('On loss of rent receivable _____ weeks')
})

const filteredSpecialConditionOptions = computed(() => {
  let options = [...allSpecialConditionOptions]

  if (isCFTOrCFTE.value) {
    return [
      'Acts of Terrorism and Malicious Damage are excluded from cover',
      'Subject to Infectious Disease Exclusion Clause',
      'Subject to Dynamo Exclusion Clause',
      'Subject to CFT 5 Clause',
      'Police Report Must',
      'No Jewelry / valuables outside safe should not exceed AWG 900.00 (US$ 500.00)',
    ]
  }

  if (['Smart Cas', 'Smart Economy Cas'].includes(props.formData.buildingOccupation)) {
    return options.filter((opt) => !opt.includes('Acts of Terrorism'))
  }

  if (!['Fire only', 'Fire All Extended'].includes(props.formData.buildingOccupation)) {
    return options.filter((opt) => !opt.includes('Reinstatement Value'))
  }

  return options
})

const automaticConditions = computed(() => {
  const conditions = []

  if (props.formData.indexRequired === 'Yes') {
    conditions.push('Subject to Index Clause')
  }

  if (hasSolarPanels.value) {
    conditions.push('Subject to Solar Panels Clause')
  }

  if (props.formData.specialCoverages?.includes('On loss of rent receivable _____ weeks')) {
    conditions.push('Subject to Loss of Rent Clause')
  }

  return conditions
})

const showMortgageClause = computed(() => {
  return (
    props.formData.mortgageClause === 'Yes' &&
    (props.formData.mortgageInstitution || props.formData.mortgageInstitutionOther)
  )
})

const hasSolarPanels = computed(() => {
  return (
    props.formData.buildingItems?.includes('On Solar Panels') ||
    props.formData.buildingAmounts?.['On Solar Panels'] > 0
  )
})

const isCFTOrCFTE = computed(() => {
  return props.formData.buildingOccupation === 'CFT' || props.formData.buildingOccupation === 'CFTE'
})
</script>