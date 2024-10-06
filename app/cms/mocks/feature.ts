import { ComponentFeatureEnum } from "../../../types";
import SvgOne from "../../QuotationPage/assets/features/Productivity.svg"
import SvgTwo from "../../QuotationPage/assets/features/Employee Retention.svg"
import SvgThree from "../../QuotationPage/assets/features/Focus.svg"
import SvgFour from "../../QuotationPage/assets/features/Courtyard Feeling.svg"

export const COMPONENT_FEATURE_DATA_OPTIONS = [
    {
        header: 'Benefits for Hospitals',
        value: ComponentFeatureEnum.Hospital,
        benefits: [
            {
                image: SvgOne,
                title: 'Promotes Healing',
                subtitle:
                    'Natural-like light helps patients recover faster by reducing stress and improving mood.',
                iconUrl: 'healingIcon',
            },
            {
                image: SvgTwo,
                title: 'Reduces Fatigue',
                subtitle:
                    'Bright, natural light reduces eye strain and fatigue for both patients and healthcare professionals.',
                iconUrl: 'fatigueIcon',
            },
            {
                image: SvgThree,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your hospital as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
                image: SvgFour,
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
                image: SvgOne,
                title: 'Customer Experience',
                subtitle:
                    'SUNROOOF creates a warm, inviting atmosphere that makes one feel more comfortable and relaxed, encouraging them to stay longer and enjoy their meals.',
                iconUrl: 'customerExperienceIcon',
            },
            {
                image: SvgTwo,
                title: 'Recall Value',
                subtitle:
                    'The unique and pleasant lighting experience provided by SUNROOOF will make your hotel memorable, encouraging repeat visits and positive word-of-mouth.',
                iconUrl: 'recallValueIcon',
            },
            {
                image: SvgThree,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a passion for innovation and modern thinking, positioning your hotels as forward-thinking establishments.',
                iconUrl: 'reputationIcon',
            },
            {
                image: SvgFour,
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
                title: 'Dining Experience',
                subtitle:
                    'SUNROOOF creates a warm, inviting atmosphere that makes diners feel more comfortable and relaxed, encouraging them to stay longer and enjoy their meals.',
                iconUrl: 'diningExperienceIcon',
            },
            {
                title: 'Recall Value',
                subtitle:
                    'The unique and pleasant lighting experience provided by SUNROOOF makes your restaurant memorable, encouraging repeat visits and positive word-of-mouth.',
                iconUrl: 'recallValueIcon',
            },
            {
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your restaurant as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
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
                image: SvgOne,
                title: 'Increases Productivity',
                subtitle:
                    'SUNROOOF mimics natural light, reducing eye strain and fatigue, leading to higher employee productivity.',
                iconUrl: 'productivityIcon',
            },
            {
                image: SvgTwo,

                title: 'Employee Retention',
                subtitle:
                    'A well-lit, pleasant work environment increases job satisfaction, helping to retain top talent within the organisation.',
                iconUrl: 'retentionIcon',
            },
            {
                image: SvgThree,
                title: 'Improves Focus',
                subtitle:
                    'Consistent, quality lighting helps maintain concentration and focus, enabling employees to perform their tasks more efficiently.',
                iconUrl: 'focusIcon',
            },
            {
                image: SvgFour,
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
                image: SvgOne,
                title: 'Improves Focus',
                subtitle:
                    "Students can focus better and much longer under natural-like light, enhancing learning and academic performance. Post lunches won't be lethargic anymore!",
                iconUrl: 'focusIcon',
            },
            {
                image: SvgTwo,
                title: 'Boosts Energy',
                subtitle:
                    'Bright natural lighting helps maintain alertness and energy levels throughout the school day, increasing positivity substantially.',
                iconUrl: 'energyIcon',
            },
            {
                image: SvgThree,
                title: 'Increases Reputation',
                subtitle:
                    'Installing SUNROOOF demonstrates a commitment to innovation and modern thinking, positioning your school as a forward-thinking establishment.',
                iconUrl: 'reputationIcon',
            },
            {
                image: SvgFour,

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
                image: SvgOne,
                title: 'Shopping Experience',
                subtitle:
                    'SUNROOOF creates a bright, inviting atmosphere that encourages more customers to come in and stay longer to shop more.',
                iconUrl: 'shoppingExperienceIcon',
            },
            {
                image: SvgTwo,
                title: 'Boosts Sales',
                subtitle:
                    'A pleasant and engaging environment with appealing products can increase customer satisfaction and drive heavier sales.',
                iconUrl: 'boostSalesIcon',
            },
            {
                image: SvgThree,

                title: 'Enhances Products',
                subtitle:
                    'Natural-like lighting highlights the true colours and details of products, making them more appealing and beautiful.',
                iconUrl: 'enhanceProductsIcon',
            },
            {
                image: SvgFour,

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
                image: SvgOne,
                title: 'Improves Mood',
                subtitle:
                    'Being under the SUNROOOF boosts serotonin in the brain, making us feel a lot more positive, happy, and joyful.',
                iconUrl: 'improvesMoodIcon',
            },
            {
                image: SvgTwo,
                title: 'Courtyard Feeling',
                subtitle:
                    'SUNROOOF transforms any room into an open sky courtyard, making you feel like you are outdoors even while being indoors.',
                iconUrl: 'courtyardIcon',
            },
            {
                image: SvgThree,
                title: 'Improves Focus',
                subtitle:
                    'SUNROOOF dramatically improves our focus and concentration levels, giving much longer hours of productivity.',
                iconUrl: 'focusIcon',
            },
            {
                image: SvgFour,
                title: 'Forward Thinking',
                subtitle:
                    'Having SUNROOOF demonstrates a passion for innovation, immediately making guests believe that you are a forward-thinking family!',
                iconUrl: 'forwardThinkingIcon',
            },
        ],
    },
]
