<template>
  <q-expansion-item
    group="form-sections"
    icon="shield"
    label="Cover Required"
    header-class="text-primary text-weight-bold"
  >
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <h6 class="text-weight-bold q-mb-md">Fire & Lightning Coverage</h6>
            
            <div class="row items-center q-mb-sm">
              <q-toggle
                v-model="form.fireLightningOnly"
                color="primary"
                label="Fire & Lightning Only"
              />
            </div>
            
            <div class="row items-center q-mb-sm">
              <q-toggle
                v-model="form.fireLightningExtended"
                color="primary"
                label="Fire & Lightning All Extended"
              />
            </div>
            
            <div class="row items-center q-mb-sm">
              <q-toggle
                v-model="form.smartCAS"
                color="primary"
                label="Smart CAS"
         
              />
              
            </div>
            
            <div class="row items-center">
              <q-toggle
                v-model="form.smartEconomyCAS"
                color="primary"
                label="Smart Economy CAS"
              />
              
            </div>
          </div>
          
          <div class="col-md-6">
            <h6 class="text-weight-bold q-mb-md">Combined Coverage</h6>
            
            <div class="row items-center q-mb-sm">
              <p class="q-ma-none" style="width: 250px;">Combined Fire & Theft Cover Needed:</p>
              <q-radio 
                v-model="form.combinedFireTheft"
                val="Yes"
                label="Yes"
                class="q-mr-sm"
              />
              <q-radio 
                v-model="form.combinedFireTheft"
                val="No"
                label="No"
              />
            </div>
            
            <div class="row items-center q-mb-sm">
              <p class="q-ma-none" style="width: 250px;">Combined Fire & Theft Extended Cover Needed:</p>
              <q-radio 
                v-model="form.combinedFireTheftExtended"
                val="Yes"
                label="Yes"
                class="q-mr-sm"
              />
              <q-radio 
                v-model="form.combinedFireTheftExtended"
                val="No"
                label="No"
              />
            </div>
            
            <div class="row items-center">
              <p class="q-ma-none" style="width: 250px;">Burglary Cover Needed:</p>
              <q-radio 
                v-model="form.burglaryCover"
                val="Yes"
                label="Yes"
                class="q-mr-sm"
              />
              <q-radio 
                v-model="form.burglaryCover"
                val="No"
                label="No"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup>
import { reactive} from 'vue';

const form = reactive({
  fireLightningOnly: false,
  fireLightningExtended: false,
  smartCAS: false,
  smartEconomyCAS: false,
  
  combinedFireTheft: 'No',
  combinedFireTheftExtended: 'No',
  burglaryCover: 'No',
  
  mainCoverType: ''
});




defineExpose({
  formData: form,
  resetForm: () => {
    Object.assign(form, {
      fireLightningOnly: false,
      fireLightningExtended: false,
      smartCAS: false,
      smartEconomyCAS: false,
      combinedFireTheft: 'No',
      combinedFireTheftExtended: 'No',
      burglaryCover: 'No'
    });
  }
});
</script>

<style scoped>
.row.items-center {
  min-height: 48px;
}
</style>