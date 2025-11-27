import { apiService } from './src/features/sales/api/api.ts'
import { customersApi } from './src/features/sales/api/customer.api.ts'

apiService.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzNjQ1ODU5LCJpYXQiOjE3NjM2NDIyNTksImp0aSI6ImRlZjM4NDNjYTAwYjQzMTI4NWNiZjQwMDNlOGM4ZjlkIiwidXNlcl9pZCI6MX0.24Z07WcBc3scUb6QHtajNX7Tq-gXa-sUYEs8A2tk-dU')

async function main() {
    const customers = await customersApi.readAll();
    const customer = await customer
    console.log(res);
}

main();