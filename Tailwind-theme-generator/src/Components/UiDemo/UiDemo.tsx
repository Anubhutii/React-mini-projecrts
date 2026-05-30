import type { Theme } from "../../types/theme";
import WebUi from "./WebUi";
import FilterChecklist from "./FilterChecklist";
import MusicPlayerCard from "./MusicPlayerCard";
import StatsGraphCard from "./StatsGraphCard";
import ProductListCard from "./ProductListCard";
import PriceRangeCard from "./PriceRangeCard";
import ProductCard from "./BagCard";
import ButtonsShowcase from "./ButtonsShowcase";
import RegisterCard from "./RegisterCard";
import ClientTableCard from "./ClientTableCard";


type Props = {
  theme: Theme;
};

export default function UiDemo({ theme }: Props) {
  return (
    <div className="mt-2 space-y-2 pb-4">
      {/* Top big preview */}
      <div className="px-1 md:px-2">
        <WebUi theme={theme} />
      </div>

      {/* Grid for small/medium cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 px-1 md:px-2">
        <div className="flex flex-col gap-2 w-full">
          <FilterChecklist theme={theme} />
          <MusicPlayerCard theme={theme} />
          <ButtonsShowcase theme={theme} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <StatsGraphCard theme={theme} />
          <ProductListCard theme={theme} />
        </div>

        <div className="flex flex-col gap-2 lg:col-span-2 xl:col-span-1 w-full">
          <PriceRangeCard theme={theme} />
          <ProductCard theme={theme} />
        </div>
      </div>

      {/* Footer cards */}
      <div className="flex flex-col lg:flex-row gap-2 px-1 md:px-2 items-start">
        <div className="w-full lg:w-auto shrink-0">
          <RegisterCard theme={theme} />
        </div>
        <div className="flex-1 w-full overflow-x-auto p-2">
          <ClientTableCard theme={theme} />
        </div>
      </div>
    </div>
  );
}
