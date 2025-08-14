# Logistics Cleanup And Reconciliation

This project provides tools for cleaning up logistics data and reconciling orders, couriers, and zones. It is designed to process input files, generate clean outputs, and help with assignment planning and reconciliation tasks for logistics operations.

> **Note:** The `log.csv` file **must** include a header row with the following keys, in this exact order:  
> `orderId,courierId,deliveredAt`

## Features

- Data cleanup for orders, couriers, and zones
- Assignment planning for couriers and orders
- Reconciliation of logs and results
- Error handling and shared utility functions

## Project Structure

- `src/` - Main source code
  - `assignmentResponse.ts` - Handles assignment responses
  - `couriers.ts` - Courier-related logic
  - `logs.ts` - Log processing
  - `orders.ts` - Order processing
  - `reconciliation.ts` - Reconciliation logic
  - `zones.ts` - Zone management
  - `shared/` - Shared utilities (errors, functions, statics)
  - `types/` - Type definitions
- `test_1/`, `test_2/`, `test_3/` - Test data and results
  - `couriers.json`, `orders.json`, `zones.csv`, `log.csv` - Input data
  - `result/` - Output results (cleaned orders, plan, reconciliation)
- `package.json` - Project dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `LICENSE` - License information

## Getting Started

1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Run the project:**
   ```powershell
   npm run dev
   ```

## Usage

Place your test data in the appropriate `test_x` folder. and set `.env`: `BASE_TEST_FILE=path_to_the_test_folder` The results will be generated in the corresponding `result` subfolder.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
