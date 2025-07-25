<template>
  <q-page class="q-pa-md">
    <div class="q-mb-xl">
      <h4 class="text-h4 text-weight-bold q-mb-none">Dashboard</h4>
      <p class="text-subtitle1 text-grey-8 q-mt-sm">
        Here you can quickly access active forms, review recent registrations, and manage the system.
      </p>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card class="full-height" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="whatshot" size="xl" color="red" />
            <div class="text-h6 q-mt-sm">Fire Only</div>
            <div class="text-subtitle2 text-grey-7">View and fill out forms</div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions class="flex flex-center">
            <q-btn 
              label="Go" 
              to="/FireOnly" 
              icon="whatshot" 
              color="red" 
              outline
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card class="full-height" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="list" size="xl" color="primary" />
            <div class="text-h6 q-mt-sm">Fire All Extended</div>
            <div class="text-subtitle2 text-grey-7">View and fill out forms</div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions class="flex flex-center">
            <q-btn 
              label="Go" 
              to="/FireAll" 
              icon="list" 
              color="primary" 
              outline
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card class="full-height" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="bolt" size="xl" color="orange" />
            <div class="text-h6 q-mt-sm">Smart Cas</div>
            <div class="text-subtitle2 text-grey-7">View and fill out forms</div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions class="flex flex-center">
            <q-btn 
              label="Go" 
              to="/SmartCas" 
              icon="bolt" 
              color="orange" 
              outline
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3">
        <q-card class="full-height" flat bordered>
          <q-card-section class="text-center">
            <q-icon name="savings" size="xl" color="green" />
            <div class="text-h6 q-mt-sm">Smart Economy Cas</div>
            <div class="text-subtitle2 text-grey-7">View and fill out forms</div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions class="flex flex-center">
            <q-btn 
              label="Go" 
              to="/SmartEconomyCas" 
              icon="savings" 
              color="green" 
              outline
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.q-page {
  padding: 24px;
}

.q-card {
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.q-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.q-btn {
  font-weight: 500;
}

.q-separator {
  background: rgba(0,0,0,0.1);
}
</style>