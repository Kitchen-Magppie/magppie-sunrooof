import { combineReducers } from '@reduxjs/toolkit';

import {
    AuthReducer,
    SuperUserReducer,
    ProjectReducer,
    KitchenReducer,
    UserReducer,
    LandingReducer,
    ConsultationReducer,
    CustomerReducer,
} from "./slices"


const CmsReducers = combineReducers({
    Auth: AuthReducer,
    Landing: LandingReducer,
    Customer: CustomerReducer,
    Users: UserReducer,
    Kitchens: KitchenReducer,
    Projects: ProjectReducer,
    SuperUsers: SuperUserReducer,
    Consultations: ConsultationReducer,

})

export default CmsReducers
