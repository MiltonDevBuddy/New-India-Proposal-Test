<template>
  <q-expansion-item
    group="form-sections"
    icon="attach_money"
    label="Amounts and Description of Insurance Required"
    header-class="text-primary text-weight-bold"
  >
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md">
          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Building Items (Select multiple):</p>
            <q-select
              filled
              v-model="form.buildingItems"
              :options="buildingItemOptions"
              label="Select building items to insure"
              multiple
              use-chips
              dense
              standout
            />
            
            <div v-for="item in form.buildingItems" :key="item" class="q-mt-sm">
              <q-input
                filled
                v-model="form.buildingAmounts[item]"
                :label="`Sum insured for ${item}`"
                type="number"
                dense
                standout
                suffix="USD"
              />
            </div>
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">General Contents (Select multiple):</p>
            <q-select
              filled
              v-model="form.generalContentsItems"
              :options="generalContentsOptions"
              label="Select general contents to insure"
              multiple
              use-chips
              dense
              standout
            />
            
            <div v-for="item in form.generalContentsItems" :key="item" class="q-mt-sm">
              <q-input
                filled
                v-model="form.generalContentsAmounts[item]"
                :label="`Sum insured for ${item}`"
                type="number"
                dense
                standout
                suffix="USD"
              />
            </div>
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">High Risk Items (Select multiple):</p>
            <q-select
              filled
              v-model="form.highRiskItems"
              :options="highRiskOptions"
              label="Select high risk items to insure"
              multiple
              use-chips
              dense
              standout
            />
            
            <div v-for="item in form.highRiskItems" :key="item" class="q-mt-sm">
              <q-input
                filled
                v-model="form.highRiskAmounts[item]"
                :label="`Sum insured for ${item}`"
                type="number"
                dense
                standout
                suffix="USD"
              />
            </div>
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Valuables (Select multiple):</p>
            <q-select
              filled
              v-model="form.valuablesItems"
              :options="valuablesOptions"
              label="Select valuables to insure"
              multiple
              use-chips
              dense
              standout
            />
            
            <div v-for="item in form.valuablesItems" :key="item" class="q-mt-sm">
              <q-input
                filled
                v-model="form.valuablesAmounts[item]"
                :label="`Sum insured for ${item}`"
                type="number"
                dense
                standout
                suffix="USD"
              />
            </div>
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Additional Items:</p>
            <q-input
              filled
              v-model="form.additionalItemsDescription"
              label="Description of additional items"
              dense
              standout
            />
            <q-input
              filled
              v-model="form.additionalItemsAmount"
              label="Sum insured for additional items"
              type="number"
              dense
              standout
              suffix="USD"
              class="q-mt-sm"
            />
          </div>

           <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Special Coverages:</p>
            
            <q-radio
              v-model="form.specialCoverageSelection"
              val="loss_of_rent"
              label="On loss of rent receivable"
              class="q-mb-sm"
            />
            <div v-if="form.specialCoverageSelection === 'loss_of_rent'" class="q-ml-lg">
              <q-input
                filled
                v-model="form.specialCoverageValues.loss_of_rent_weeks"
                label="Number of weeks"
                type="number"
                dense
                standout
                suffix="weeks"
                :rules="[val => val <= 52 || 'Maximum 52 weeks']"
                class="q-mb-sm"
              />
              <p class="text-caption text-grey-7">(subject to maximum of 5% of T.S.I.)</p>
            </div>

            <q-radio
              v-model="form.specialCoverageSelection"
              val="removal_of_debris"
              label="On removal of debris"
              class="q-mb-sm"
            />
            <p v-if="form.specialCoverageSelection === 'removal_of_debris'" class="text-caption text-grey-7 q-ml-lg">
              (subject to maximum of 10% of T.S.I.)
            </p>

            <q-radio
              v-model="form.specialCoverageSelection"
              val="burglary_damage"
              label="On damage to building in the course of a committed Burglary"
              class="q-mb-sm"
            />
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Insurance & Claim History:</p>
            <q-input
              filled
              v-model="form.insuranceHistory"
              label="Describe any previous insurance claims"
              dense
              standout
            />
          </div>

          <div class="q-pa-sm">
            <p class="q-mb-sm text-weight-medium">Signature:</p>
            <q-input
              filled
              v-model="form.signature"
              label="Type your full name as signature"
              dense
              standout
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  buildingItems: [],
  buildingAmounts: {},
  generalContentsItems: [],
  generalContentsAmounts: {},
  highRiskItems: [],
  highRiskAmounts: {},
  valuablesItems: [],
  valuablesAmounts: {},
  additionalItemsDescription: '',
  additionalItemsAmount: 0,
   specialCoverageSelection: 'none',
    specialCoverageValues: {
    loss_of_rent_weeks: 0,
    removal_of_debris: true,
    burglary_damage: true
     },
});

const buildingItemOptions = [
  'On main building(s)',
  'On fence/premises boundary wall/gates',
  'Servant\'s quarters/outhouses/Garage',
  'Tenants interest/improvements',
  'On landscaping/pavers/garden paving',
  'On swimming-pool/pool-deck',
  'On gazebo',
  'On bar',
  'On storage',
  'On Solar Panels'
];

const generalContentsOptions = [
  'On household furniture, fixtures and fittings',
  'On household personal effects/gadgets/equipment',
  'On piano and organ',
  'On split aircos or water heater units or moveable property outside the house but within the fence'
];

const highRiskOptions = [
  'On Computers and Laptops',
  'On Cameras and video games',
  'On Cellular phones & I-pods',
  'Any other portable electronic equipment'
];

const valuablesOptions = [
  'On Jewellery, watches or Trinkets or Personal Ornaments or Furs or Gold and Silver',
  'On art and antique items'
];

defineExpose({
  formData: form,
  resetForm: () => {
    Object.assign(form, {
      buildingItems: [],
      buildingAmounts: {},
      generalContentsItems: [],
      generalContentsAmounts: {},
      highRiskItems: [],
      highRiskAmounts: {},
      valuablesItems: [],
      valuablesAmounts: {},
      additionalItemsDescription: '',
      additionalItemsAmount: 0,
      specialCoverages: [],
      specialCoverageValues: {},
      insuranceHistory: '',
      signature: ''
    });
  }
});
</script>