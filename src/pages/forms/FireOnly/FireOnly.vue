<template>
  <q-page class="q-pa-md">
    <div class="q-mb-lg">
      <h1 class="text-h4 text-primary q-mb-sm text-center">FIRE ONLY</h1>
      <q-card flat bordered class="bg-grey-1">
        <q-card-section>
          <p class="text-body1 text-center">
            Complete this form to receive a personalized insurance quote for your property. Please
            provide accurate information about your building's characteristics, contents, and
            required coverages to correctly calculate your premium.
          </p>
          <p v-if="formSubmitted" class="text-positive text-center q-mt-sm">
            <q-icon name="check_circle" size="sm" /> Form submitted successfully!
          </p>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-gutter-y-md">
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <GeneralInformation ref="generalInfoForm" />
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <ProposerInformation ref="proposerInfoForm" />
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <BuildingConstruction ref="buildingConstructionForm" />
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <CoverRequired ref="coverRequiredForm" />
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <InsuranceAmounts ref="insuranceAmountsForm" />
        </q-card-section>
      </q-card>
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <Summary ref="summaryRef" :form-data="combinedFormData" :reset-trigger="resetFlag" />
        </q-card-section>
      </q-card>
    </div>

    <q-card v-if="premiumCalculation" class="q-mt-md" flat bordered>
      <q-card-section>
        <div class="text-h6 text-primary">Quotation Result</div>
        <q-markup-table dense class="q-mt-sm">
          <thead>
            <tr class="bg-grey-3">
              <th class="text-left">Category</th>
              <th class="text-right">Insured Amount</th>
              <th class="text-right">Rate</th>
              <th class="text-right">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in premiumCalculation.items" :key="index">
              <td class="text-left">{{ item.category }}</td>
              <td class="text-right">{{ formatCurrency(item.sumInsured) }}</td>
              <td class="text-right">{{ item.rate }}‰</td>
              <td class="text-right">{{ formatCurrency(item.premium) }}</td>
            </tr>
            <tr class="bg-grey-2">
              <td class="text-left text-weight-bold">Total Insured Amount</td>
              <td class="text-right text-weight-bold">
                {{ formatCurrency(premiumCalculation.totalSumInsured) }}
              </td>
              <td></td>
              <td class="text-right text-weight-bold">
                {{ formatCurrency(premiumCalculation.totalPremium) }}
              </td>
            </tr>
            <tr v-if="discountApplied" class="bg-blue-1">
              <td class="text-left text-weight-bold">Discount Applied</td>
              <td></td>
              <td></td>
              <td class="text-right text-weight-bold text-negative">
                -{{ formatCurrency(premiumCalculation.discountAmount) }}
              </td>
            </tr>
            <tr v-if="discountApplied" class="bg-grey-2">
              <td class="text-left text-weight-bold">Final Premium</td>
              <td></td>
              <td></td>
              <td class="text-right text-weight-bold">
                {{ formatCurrency(premiumCalculation.finalPremium) }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>

        <div v-if="premiumCalculation.additionalCharges" class="q-mt-md">
          <div class="text-subtitle2">Additional Charges:</div>
          <ul>
            <li v-for="(charge, index) in premiumCalculation.additionalCharges" :key="index">
              {{ charge.description }}: {{ formatCurrency(charge.amount) }}
            </li>
          </ul>
        </div>
      </q-card-section>
    </q-card>

    <div class="bottom q-pa-md">
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          label="Calculate Premium"
          color="primary"
          @click="calculatePremium"
          icon="calculate"
          :disable="!isReadyForCalculation"
          :loading="calculating"
        />
        <q-btn 
          label="Submit Request" 
          color="positive" 
          @click="submitForm" 
          icon="send"
          :loading="submitting"
          :disable="!premiumCalculation || submitting"
        />
        <q-btn 
          label="Clear Form" 
          color="grey" 
          @click="resetForm" 
          icon="cleaning_services"
          :disable="submitting"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import GeneralInformation from './subForms/GeneralInformation.vue'
import ProposerInformation from './subForms/ProposerInformation.vue'
import BuildingConstruction from './subForms/BuildingDetails.vue'
import CoverRequired from './subForms/CoverRequired.vue'
import InsuranceAmounts from './subForms/AmountsDescription.vue'
import Summary from './subForms/SummaryForm.vue'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const summaryRef = ref(null)
const proposerInfoForm = ref(null)
const generalInfoForm = ref(null)
const buildingConstructionForm = ref(null)
const coverRequiredForm = ref(null)
const insuranceAmountsForm = ref(null)

const premiumCalculation = ref(null)
const formSubmitted = ref(false)
const submitting = ref(false)
const calculating = ref(false)
const resetFlag = ref(false)

const combinedFormData = computed(() => ({
  ...generalInfoForm.value?.formData,
  ...proposerInfoForm.value?.formData,
  ...buildingConstructionForm.value?.formData,
  ...coverRequiredForm.value?.formData,
  ...insuranceAmountsForm.value?.formData,
}))

const isReadyForCalculation = computed(() => {
  const data = insuranceAmountsForm.value?.formData
  return (data?.buildingItems?.length > 0 && Object.keys(data?.buildingAmounts || {}).length > 0) || 
         (data?.generalContentsItems?.length > 0 && Object.keys(data?.generalContentsAmounts || {}).length > 0)
})

const discountApplied = computed(() => {
  return premiumCalculation.value?.discountApplied || false
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value || 0)
}

const calculatePremium = async () => {
  calculating.value = true
  
  try {
    if (!validateFormsBeforeCalculation()) {
      return
    }

    const amountsData = insuranceAmountsForm.value?.formData
    if (!amountsData) {
      showNotification('negative', 'No insurance data', 'Please fill in the insurance amounts', 'error')
      return
    }

    console.log('Datos para cálculo:', amountsData) // Debug

    const items = []
    let totalSumInsured = 0
    let totalPremium = 0

    if (amountsData.buildingItems?.length > 0) {
      const buildingSum = amountsData.buildingItems.reduce((sum, item) => {
        const amount = Number(amountsData.buildingAmounts[item]) || 0
        return sum + amount
      }, 0)

      if (buildingSum > 0) {
        const buildingPremium = (buildingSum / 1000) * 2.5
        items.push({
          category: 'Building',
          sumInsured: buildingSum,
          rate: '2.50',
          premium: buildingPremium,
        })
        totalSumInsured += buildingSum
        totalPremium += buildingPremium
      }
    }

    if (amountsData.generalContentsItems?.length > 0) {
      const contentsSum = amountsData.generalContentsItems.reduce((sum, item) => {
        const amount = Number(amountsData.generalContentsAmounts[item]) || 0
        return sum + amount
      }, 0)

      if (contentsSum > 0) {
        const contentsPremium = (contentsSum / 1000) * 5.5
        items.push({
          category: 'General Contents',
          sumInsured: contentsSum,
          rate: '5.50',
          premium: contentsPremium,
        })
        totalSumInsured += contentsSum
        totalPremium += contentsPremium
      }
    }

    if (items.length === 0) {
      showNotification('warning', 'No items to insure', 'Please select at least one item to insure', 'warning')
      return
    }

    let discountAmount = 0
    let finalPremium = totalPremium
    const shouldApplyDiscount = totalPremium > 1000
    
    if (shouldApplyDiscount) {
      discountAmount = totalPremium * 0.1
      finalPremium = totalPremium - discountAmount
    }

    const policyFee = 50
    const taxes = finalPremium * 0.07
    const totalAdditionalCharges = policyFee + taxes
    finalPremium += totalAdditionalCharges

    premiumCalculation.value = {
      items,
      totalSumInsured,
      totalPremium,
      discountApplied: shouldApplyDiscount,
      discountAmount,
      finalPremium,
      additionalCharges: [
        {
          description: 'Policy Fee',
          amount: policyFee
        },
        {
          description: 'Taxes',
          amount: taxes
        }
      ]
    }

    showNotification('positive', 'Premium calculated successfully', `Total premium: ${formatCurrency(finalPremium)}`, 'calculate')
    
  } catch (error) {
    console.error('Calculation error:', error)
    showNotification('negative', 'Calculation failed', 'Please check your inputs and try again', 'error')
  } finally {
    calculating.value = false
  }
}

const validateFormsBeforeCalculation = () => {
  const forms = [
    generalInfoForm.value,
    proposerInfoForm.value,
    buildingConstructionForm.value,
    coverRequiredForm.value,
    insuranceAmountsForm.value
  ]

  let isValid = true
  const invalidSections = []

  forms.forEach(form => {
    if (!form?.validate?.()) {
      isValid = false
      const sectionName = form.$el?.querySelector('.q-expansion-item__title')?.textContent || 'Unknown section'
      invalidSections.push(sectionName)
    }
  })

  if (!isValid) {
    showNotification('warning', 'Form validation errors', 
      `Please complete these sections:\n${invalidSections.join('\n')}`, 
      'warning')
  }

  return isValid
}

const validateForm = () => {
  const forms = [
    { ref: generalInfoForm, name: 'General Information' },
    { ref: proposerInfoForm, name: 'Proposer Information' },
    { ref: buildingConstructionForm, name: 'Building Construction' },
    { ref: coverRequiredForm, name: 'Cover Required' },
    { ref: insuranceAmountsForm, name: 'Insurance Amounts' }
  ]

  let isValid = true
  const invalidSections = []

  forms.forEach(({ ref, name }) => {
    if (!ref.value?.validate?.()) {
      isValid = false
      invalidSections.push(name)
    }
  })

  if (!isValid) {
    showNotification('warning', 'Incomplete form', 
      `The following sections have errors:\n${invalidSections.join('\n')}`, 
      'warning')
  }

  return isValid
}

const submitForm = async () => {
  if (!premiumCalculation.value) {
    showNotification('warning', 'Premium not calculated', 'Please calculate premium before submitting', 'warning')
    return
  }

  if (!validateForm()) {
    return
  }

  submitting.value = true
  
  try {
    const formData = {
      generalInfo: generalInfoForm.value?.formData,
      proposerInfo: proposerInfoForm.value?.formData,
      buildingConstruction: buildingConstructionForm.value?.formData,
      coverRequired: coverRequiredForm.value?.formData,
      insuranceAmounts: insuranceAmountsForm.value?.formData,
      premiumCalculation: premiumCalculation.value
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submission data:', formData)
    
    showNotification('positive', 'Request submitted successfully', 
      `Your reference number is #${Math.floor(1000 + Math.random() * 9000)}`, 
      'check_circle')
    
    formSubmitted.value = true
    
  } catch (error) {
    console.error('Submission error:', error)
    showNotification('negative', 'Submission failed', 
      error.message || 'Please try again later', 
      'error')
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  generalInfoForm.value?.resetForm()
  proposerInfoForm.value?.resetForm()
  buildingConstructionForm.value?.resetForm()
  coverRequiredForm.value?.resetForm()
  insuranceAmountsForm.value?.resetForm()
  summaryRef.value?.resetForm()
  
  premiumCalculation.value = null
  formSubmitted.value = false
  resetFlag.value = true
  
  setTimeout(() => {
    resetFlag.value = false
  }, 100)
}

const showNotification = (type, message, caption = '', icon = '') => {
  $q.notify({
    type,
    message,
    caption,
    icon,
    position: 'top-right',
    timeout: type === 'negative' ? 5000 : 3000,
    actions: type === 'positive' ? [{ label: 'OK', color: 'white' }] : undefined
  })
}
</script>

<style scoped>
.q-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bottom {
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.q-field__label span:after {
  content: " *";
  color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.required-field .q-field__label:after {
  content: " *";
  color: #f44336;
}
</style>