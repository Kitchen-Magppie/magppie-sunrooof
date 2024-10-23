import { ComponentComparisonDataEnum, TComponentComparisonDataOption } from "../../../types";

import ClassicalWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Classical.png"
import FrenchWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/French.png"
import ModernWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Modern.png"
import FlutedWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Fluted.png"
import LouveredWindowSunrooofLow from "../../QuotationPage/assets/sunrooof/low/Louvered.jpeg"

import ClassicalWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Classical.jpeg"
import FrenchWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/French.jpeg"
import ModernWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Modern.jpeg"
import FlutedWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Fluted.jpeg"
import LouveredWindowSunrooofHigh from "../../QuotationPage/assets/sunrooof/high/Louvered.jpeg"

export const CUSTOMER_COMPONENT_COMPARISON_OPTIONS: TComponentComparisonDataOption[] = [
    { label: "Arch Window", value: ComponentComparisonDataEnum.ArchWindow, image: { high: FlutedWindowSunrooofHigh, low: FlutedWindowSunrooofLow } },
    { label: "Classical Sunrooof", value: ComponentComparisonDataEnum.ClassicalSunrooof, image: { high: ClassicalWindowSunrooofHigh, low: ClassicalWindowSunrooofLow } },
    { label: "Fluted Minimalist Sunrooof", value: ComponentComparisonDataEnum.FlutedMinimalistSunrooof, image: { high: '', low: '' } },
    { label: "French Window", value: ComponentComparisonDataEnum.FrenchWindow, image: { high: FrenchWindowSunrooofHigh, low: FrenchWindowSunrooofLow } },
    { label: "Louvered Window", value: ComponentComparisonDataEnum.LouveredWindow, image: { high: LouveredWindowSunrooofHigh, low: LouveredWindowSunrooofLow } },
    { label: "Modern Sunrooof", value: ComponentComparisonDataEnum.ModernSunrooof, image: { high: ModernWindowSunrooofHigh, low: ModernWindowSunrooofLow } },
];
