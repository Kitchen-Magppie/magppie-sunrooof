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
    PresentationReducer,
    ProposedLayoutReducer
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
    Presentation: PresentationReducer,
    ProposedLayout: ProposedLayoutReducer

})

export default CmsReducers
