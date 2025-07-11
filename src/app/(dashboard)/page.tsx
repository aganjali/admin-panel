import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { ChartPieDonut } from "@/components/chart-pie-donut";
import { ChartBarMixed } from "@/components/chart-bar-mixed";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
          <div className="flex gap-4 px-4 lg:px-6">
            <div className="basis-1/2">
              <ChartPieDonut />
            </div>
            <div className="basis-1/2">
              <ChartBarMixed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
