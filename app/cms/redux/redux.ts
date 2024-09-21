import { combineReducers } from '@reduxjs/toolkit';

import {
    CustomerSiteComponentReducer,
    AuthReducer,
    SuperUserReducer,
    // ProjectReducer,
    // KitchenReducer,
    // UserReducer,
    // LandingReducer,
    // ConsultationReducer,
} from "./slices"


const CmsReducers = combineReducers({
    Auth: AuthReducer,
    // Landing: LandingReducer,
    CustomerSiteComponent: CustomerSiteComponentReducer,
    // Users: UserReducer,
    // Kitchens: KitchenReducer,
    // Projects: ProjectReducer,
    SuperUsers: SuperUserReducer,
    // Consultations: ConsultationReducer,

})

export default CmsReducers
