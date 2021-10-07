<template :table="table">
    <div class="detail-table up-down-table">
        <table>
            <thead>
                <tr>
                    <th v-for="(entry, i) in table" :key="i">{{ entry.key }}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td v-for="(entry, i) in table" :key="i">{{ entry.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        table: Array
    }
}
</script>