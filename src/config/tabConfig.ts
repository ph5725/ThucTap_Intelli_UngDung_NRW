// // src/config/tabConfig.ts
// import { NrwCongTyResponse } from "@/types/nrw-cong-ty/nrw-cong-ty";

// // ví dụ columns
// import { listColumns } from "@/config/columns/listColumns";
// import { inputColumns } from "@/config/columns/inputColumns";
// import { outputColumns } from "@/config/columns/outputColumns";

// export interface PanelConfig {
//   list: {
//     columns: any[];
//     api: string;
//   };
//   details: {
//     input: {
//       columns: any[];
//       api: string;
//     };
//     output: {
//       columns: any[];
//       api: string;
//     };
//   };
// }

// export const tabConfig: Record<string, PanelConfig> = {
//   "gttn-company-1": {
//     list: {
//       columns: listColumns,
//       api: "/nrwCongTy/list-company-1",
//     },
//     details: {
//       input: {
//         columns: inputColumns,
//         api: "/nrwCongTy/details-company-1/input",
//       },
//       output: {
//         columns: outputColumns,
//         api: "/nrwCongTy/details-company-1/output",
//       },
//     },
//   },
//   "gttn-company-2": {
//     list: {
//       columns: listColumns,
//       api: "/nrwCongTy/list-company-2",
//     },
//     details: {
//       input: {
//         columns: inputColumns,
//         api: "/nrwCongTy/details-company-2/input",
//       },
//       output: {
//         columns: outputColumns,
//         api: "/nrwCongTy/details-company-2/output",
//       },
//     },
//   },
//   "gttn-dma": {
//     list: {
//       columns: listColumns,
//       api: "/nrwCongTy/list-dma",
//     },
//     details: {
//       input: {
//         columns: inputColumns,
//         api: "/nrwCongTy/details-dma/input",
//       },
//       output: {
//         columns: outputColumns,
//         api: "/nrwCongTy/details-dma/output",
//       },
//     },
//   },
// };
