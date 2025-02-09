import { combineReducers } from '@reduxjs/toolkit';
//====================================================================

import {
    AuthReducer,
    SuperUserReducer,
    ProjectReducer,
    UserReducer,
    LandingReducer,
    CustomerReducer,
    PresentationReducer,
    ProposedLayoutReducer
} from "./slices"


const CmsReducers = combineReducers({
    Auth: AuthReducer,
    Landing: LandingReducer,
    Customer: CustomerReducer,
    Users: UserReducer,
    Projects: ProjectReducer,
    SuperUsers: SuperUserReducer,
    Presentation: PresentationReducer,
    ProposedLayout: ProposedLayoutReducer

})

export default CmsReducers
