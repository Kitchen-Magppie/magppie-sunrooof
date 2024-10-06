import { ComponentFeatureEnum } from '../../../types'

import Productivity from '../../QuotationPage/assets/features/Productivity.svg'
import Retention from '../../QuotationPage/assets/features/Employee Retention.svg'
import Focus from '../../QuotationPage/assets/features/Focus.svg'
import Courtyard from '../../QuotationPage/assets/features/Courtyard Feeling.svg'
import Customer from '../../QuotationPage/assets/features/Boost Energy.svg'
import Sales from '../../QuotationPage/assets/features/Boost Sales.svg'
import Dining from '../../QuotationPage/assets/features/Dining.svg'
import Products from '../../QuotationPage/assets/features/Enhances Products.svg'
import Thinking from '../../QuotationPage/assets/features/Forward Thinking.svg'
import Healing from '../../QuotationPage/assets/features/Healing.svg'
import Fatigue from '../../QuotationPage/assets/features/Reduce Fatigue.svg'
import Reputation from '../../QuotationPage/assets/features/Reputation.svg'
import Energy from '../../QuotationPage/assets/features/Boost Energy.svg'

export const COMPONENT_FEATURE_DATA_OPTIONS = [
    {
        header: 'Benefits for Hospitals',
        value: ComponentFeatureEnum.Hospital,
        benefits: [
            {
                image: Healing,
                title: 'Promotes Healing',
                subtitle:
                    'Natural-like light helps patients recover faster by reducing stress and improving mood.',
                iconUrl: 'healingIcon',
            },
            {
                image: Fatigue,
                title: 'Reduces Fatigue',
                subtitle:
                    'Bright, natural light reduces eye strain and fatigue for both patients and healthcare professionals.',
                iconUrl: 'fatigueIcon',
            },
            {
                image: Reputation,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your hospital as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making patients feel like they are outdoors even after being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Hotels',
        value: ComponentFeatureEnum.Hotel,

        benefits: [
            {
                image: Customer,
                title: 'Customer Experience',
                subtitle:
                    'SUNROOOF creates a warm, inviting atmosphere that makes one feel more comfortable and relaxed, encouraging them to stay longer and enjoy their meals.',
                iconUrl: 'customerExperienceIcon',
            },
            {
                image: Products,
                title: 'Recall Value',
                subtitle:
                    'The unique and pleasant lighting experience provided by SUNROOOF will make your hotel memorable, encouraging repeat visits and positive word-of-mouth.',
                iconUrl: 'recallValueIcon',
            },
            {
                image: Reputation,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a passion for innovation and modern thinking, positioning your hotels as forward-thinking establishments.',
                iconUrl: 'reputationIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making customers feel like they are dining outdoors even while being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Restaurants',
        value: ComponentFeatureEnum.Restaurant,
        benefits: [
            {
                image: Dining,
                title: 'Dining Experience',
                subtitle:
                    'SUNROOOF creates a warm, inviting atmosphere that makes diners feel more comfortable and relaxed, encouraging them to stay longer and enjoy their meals.',
                iconUrl: 'diningExperienceIcon',
            },
            {
                image: Products,
                title: 'Recall Value',
                subtitle:
                    'The unique and pleasant lighting experience provided by SUNROOOF makes your restaurant memorable, encouraging repeat visits and positive word-of-mouth.',
                iconUrl: 'recallValueIcon',
            },
            {
                image: Reputation,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your restaurant as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making customers feel like they are dining outdoors even while being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Offices',
        value: ComponentFeatureEnum.Office,
        benefits: [
            {
                image: Productivity,
                title: 'Increases Productivity',
                subtitle:
                    'SUNROOOF mimics natural light, reducing eye strain and fatigue, leading to higher employee productivity.',
                iconUrl: 'productivityIcon',
            },
            {
                image: Retention,
                title: 'Employee Retention',
                subtitle:
                    'A well-lit, pleasant work environment increases job satisfaction, helping to retain top talent within the organisation.',
                iconUrl: 'retentionIcon',
            },
            {
                image: Focus,
                title: 'Improves Focus',
                subtitle:
                    'Consistent, quality lighting helps maintain concentration and focus, enabling employees to perform their tasks more efficiently.',
                iconUrl: 'focusIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making employees feel like they are outdoors even while being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Schools',
        value: ComponentFeatureEnum.School,
        benefits: [
            {
                image: Focus,
                title: 'Improves Focus',
                subtitle:
                    "Students can focus better and much longer under natural-like light, enhancing learning and academic performance. Post lunches won't be lethargic anymore!",
                iconUrl: 'focusIcon',
            },
            {
                image: Energy,
                title: 'Boosts Energy',
                subtitle:
                    'Bright natural lighting helps maintain alertness and energy levels throughout the school day, increasing positivity substantially.',
                iconUrl: 'energyIcon',
            },
            {
                image: Reputation,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your school as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making students feel like they are learning outdoors even after being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Retail Spaces',
        value: ComponentFeatureEnum.RetailSpace,

        benefits: [
            {
                image: Customer,
                title: 'Shopping Experience',
                subtitle:
                    'SUNROOOF creates a bright, inviting atmosphere that encourages more customers to come in and stay longer to shop more.',
                iconUrl: 'shoppingExperienceIcon',
            },
            {
                image: Sales,
                title: 'Boosts Sales',
                subtitle:
                    'A pleasant and engaging environment with appealing products can increase customer satisfaction and drive heavier sales.',
                iconUrl: 'boostSalesIcon',
            },
            {
                image: Products,
                title: 'Enhances Products',
                subtitle:
                    'Natural-like lighting highlights the true colours and details of products, making them more appealing and beautiful.',
                iconUrl: 'enhanceProductsIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any space into an open sky courtyard, making customers feel like they are outdoors even while being indoors. Instantly creates WOW factor!',
                iconUrl: 'courtyardIcon',
            },
        ],
    },
    {
        header: 'Benefits for Homes',
        value: ComponentFeatureEnum.Home,
        benefits: [
            {
                image: Customer,
                title: 'Improves Mood',
                subtitle:
                    'Being under the SUNROOOF boosts serotonin in the brain, making us feel a lot more positive, happy, and joyful.',
                iconUrl: 'improvesMoodIcon',
            },
            {
                image: Courtyard,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any room into an open sky courtyard, making you feel like you are outdoors even while being indoors.',
                iconUrl: 'courtyardIcon',
            },
            {
                image: Focus,
                title: 'Improves Focus',
                subtitle:
                    'SUNROOOF dramatically improves our focus and concentration levels, giving much longer hours of productivity.',
                iconUrl: 'focusIcon',
            },
            {
                image: Thinking,
                title: 'Forward Thinking',
                subtitle:
                    'Having SUNROOOF demonstrates a passion for innovation, immediately making guests believe that you are a forward-thinking family!',
                iconUrl: 'forwardThinkingIcon',
            },
        ],
    },
]
