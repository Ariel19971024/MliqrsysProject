<template>
    <div class="header-item header-info">
      <span id="date" class="header-info-date"></span>
      <span id="time" class="header-info-time"></span>
      <span class="header-info-user">{{ position }} {{ name }}({{ id }})</span>
    </div>
</template>

<script>
import '../helperFunctions/DateTime.js';

export default {
  name: "DateTime",
  data() {
    return {
      position: '業務專員',
      name: '廖家祥',
      id: 'ABC2345'
    }
  }
}
</script>