<template>
  <q-expansion-item
    group="Proposer Information"
    icon="person"
    label="Proposer Information"
    header-class="text-primary text-weight-bold"
    expand-separator
  >
    <q-card class="q-pa-md shadow-2">
      <q-card-section>
        <q-form class="q-gutter-md">
          <div class="text-subtitle1 text-weight-medium q-mb-sm">Personal Information</div>
          
          <q-input
            filled
            v-model="formData.proposerName"
            label="Name of proposer (in full)"
            standout
            dense
            :rules="[val => !!val || 'Field is required']"
          />

          <q-input
            filled
            v-model="formData.mailingAddress"
            label="Full mailing address"
            standout
            dense
            type="textarea"
            autogrow
            :rules="[val => !!val || 'Field is required']"
          />

          <div class="row q-gutter-md">
            <q-input
              class="col"
              filled
              v-model="formData.homePhone"
              label="Home or work tel.#"
              standout
              dense
              mask="(###) ### - ####"
              :rules="[val => !!val || 'Field is required']"
            />

            <q-input
              class="col"
              filled
              v-model="formData.mobilePhone"
              label="Cell / mobile #"
              standout
              dense
              mask="(###) ### - ####"
            />
          </div>

          <div class="row q-gutter-md">
            <q-input
              class="col"
              filled
              v-model="formData.email"
              label="Email"
              standout
              dense
              type="email"
              :rules="[
                val => !!val || 'Field is required',
                val => /.+@.+\..+/.test(val) || 'Invalid email format'
              ]"
            />

            <q-input
              class="col"
              filled
              v-model="formData.personsNumber"
              label="Persons #"
              standout
              dense
              type="number"
            />
          </div>

          <q-input
            filled
            v-model="formData.businessProfession"
            label="Proposer's business or profession"
            standout
            dense
          />

          <div class="text-subtitle1 text-weight-medium q-mt-lg q-mb-sm">Location of premises proposed for insurance</div>
          
          <q-input
            filled
            v-model="formData.insurancePremisesLocation"
            label="Situation (Give full address, i.e. name of building, street, town, etc)"
            standout
            dense
            type="textarea"
            autogrow
            :rules="[val => !!val || 'Field is required']"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive } from 'vue';

const formData = reactive({
  proposerName: '',
  mailingAddress: '',
  homePhone: '',
  mobilePhone: '',
  email: '',
  personsNumber: '',
  businessProfession: '',
  insurancePremisesLocation: ''
});

defineExpose({
  formData,
  validate: () => {
    const requiredFields = [
      'proposerName',
      'mailingAddress',
      'homePhone',
      'email',
      'insurancePremisesLocation'
    ];
    
    return requiredFields.every(field => !!formData[field]);
  },
  resetForm: () => {
    Object.keys(formData).forEach(key => {
      formData[key] = '';
    });
  }
});
</script>

<style scoped>
.q-expansion-item__content {
  padding: 0 16px;
}
</style>