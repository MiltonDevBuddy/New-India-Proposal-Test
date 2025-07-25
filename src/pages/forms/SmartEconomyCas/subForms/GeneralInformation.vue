<template>
  <q-expansion-item
    group="form-sections"
    icon="info"
    label="General Information"
    header-class="text-primary text-weight-bold"
 
  >
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md">
          <div class="broker">
            <q-select
              filled
              v-model="form.broker"
              :options="brokerOptions"
              label="Select broker"
              dense
              standout
              class="full-width"
            />

            <q-select
              filled
              v-model="form.accCode"
              :options="accCodeOptions"
              label="Select acc. Code"
              dense
              standout
              class="full-width"
            />
          </div>

          <div class="q-pa-sm">
            <p class="text-h6 q-mb-md">Policy Period</p>
            <div class="row q-gutter-md q-mb-md">
              <div class="col">
                <q-select
                  filled
                  v-model="form.policyMonths"
                  :options="policyMonthsOptions"
                  label="Months"
                  dense
                  standout
                  class="full-width"
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="form.policyStartDate"
                  label="Date from"
                  dense
                  standout
                  type="date"
                  class="full-width"
                />
              </div>

              <div class="col">
                <q-input
                  filled
                  v-model="form.policyEndDate"
                  label="Until 23:59:59 date"
                  dense
                  standout
                  type="date"
                  :min="form.policyStartDate"
                  class="full-width"
                  readonly
                />
              </div>
            </div>

            <div class="q-pa-sm">
              <p class="q-mb-sm text-weight-medium">
                Are you insuring as owner or tenant of the property?
              </p>
              <div class="q-pa-sm bg-grey-2 rounded-borders">
                <q-radio 
                  v-model="form.propertyRelationship" 
                  val="owner" 
                  label="Owner" 
                />
                <q-radio 
                  v-model="form.propertyRelationship" 
                  val="tenant" 
                  label="Tenant" 
                />
              </div>
            </div>

            <div class="q-pa-sm">
              <p class="q-mb-sm text-weight-medium">Residence Type:</p>
              
              <div v-if="form.propertyRelationship === 'tenant'">
                <q-input
                  filled
                  value="Residence Only"
                  label="Residence Only"
                  dense
                  standout
                  class="full-width"
                  readonly
                />
              </div>

              <div v-else>
                <q-option-group
                  v-model="form.residenceType"
                  :options="residenceTypeOptions"
                  type="radio"
                  class="q-mt-sm"
                />

                <div v-if="form.residenceType === 'Residence & Commercial Activity'" class="q-mt-md">
                  <q-select
                    filled
                    v-model="form.commercialActivityType"
                    :options="commercialActivityOptions"
                    label="Select Commercial Activity Type"
                    dense
                    standout
                    class="full-width"
                  />

                  <q-input
                    v-if="form.commercialActivityType === 'Other (please specify)'"
                    v-model="form.otherCommercialActivity"
                    label="Please specify commercial activity"
                    dense
                    filled
                    class="q-mt-sm full-width"
                  />
                </div>
              </div>
            </div>

            <div class="q-mt-lg">
              <p class="text-h6 q-mb-md ">What do you want to cover?</p>
              <q-option-group
                v-model="form.homeOption"
                :options="coverageOptions"
                type="radio"
                class="q-mt-sm flex bg-grey-2"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive, watch } from 'vue';

const form = reactive({
  broker: '',
  accCode: '',
  policyMonths: null,
  policyStartDate: null,
  policyEndDate: null,
  propertyRelationship: 'owner',
  residenceType: 'Residence Only',
  commercialActivityType: '',
  otherCommercialActivity: '',
  homeOption: ''
});

const residenceTypeOptions = [
  { label: 'Residence Only', value: 'Residence Only' },
  { label: 'Residence & Commercial Activity', value: 'Residence & Commercial Activity' }
];

const commercialActivityOptions = [
  'Short Term Rental',
  'Long Term Rental',
  'AirBnB',
  'Home Office',
  'Small Business',
  'Other (please specify)'
];

const brokerOptions = ['ASD', 'AYD', 'ASH'];
const accCodeOptions = ['ATR', 'ACS', 'AMN'];
const policyMonthsOptions = [1, 3, 6, 12];
const coverageOptions = [
  { label: 'Home (building) only', value: 'Home (building) only' },
  { label: 'Contents only', value: 'Contents only' },
  { label: 'Home + Contents', value: 'Home + Contents' }
];

watch(() => [form.policyStartDate, form.policyMonths], ([startDate, months]) => {
  if (startDate && months) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + parseInt(months));
    form.policyEndDate = date.toISOString().split('T')[0];
  }
});

watch(() => form.propertyRelationship, (newVal) => {
  if (newVal === 'tenant') {
    form.residenceType = 'Residence Only';
    form.commercialActivityType = '';
    form.otherCommercialActivity = '';
  }
});

defineExpose({
  formData: form,
  resetForm: () => {
    Object.assign(form, {
      broker: '',
      accCode: '',
      policyMonths: null,
      policyStartDate: null,
      policyEndDate: null,
      propertyRelationship: 'owner',
      residenceType: 'Residence Only',
      commercialActivityType: '',
      otherCommercialActivity: '',
      homeOption: ''
    });
  }
});
</script>

<style scoped>
.full-width {
  width: 100%;
}
.broker {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
.q-mt-lg {
  margin-top: 24px;
}
</style>