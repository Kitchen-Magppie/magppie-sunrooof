# KITCHEN MAGPPIE

## Description

**Magppie** is a premium lifestyle brand that designs and manufactures kitchens, fixed furniture, and home accessories tailored to Indian culture and conditions. Our mission is to provide high-quality, innovative, and stylish kitchen solutions that cater to the diverse needs of modern Indian households.

### Our Kitchen Styles

-   **100% Wood-Free Kitchens:** These kitchens are made from Magppie's patented M Stone material, offering durability and a unique aesthetic.
-   **International Award-Winning Kitchens:** Crafted from exotic granite, these kitchens have received international recognition for their design and quality.
-   **Caesarstone Quartz Kitchens:** Made from Caesarstone quartz, these kitchens combine elegance with robust performance.

## Technology Stack

At Magppie, we leverage the latest technologies to ensure our products and services are top-notch and meet the highest standards of quality and innovation.

-   **Firebase:** A comprehensive app development platform that helps us build and improve our web and mobile applications.
-   **TailwindCSS:** Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.
-   **Strapi:** An open-source headless CMS that allows us to manage and distribute our content efficiently.
-   **Iconify:** A versatile icon framework that provides a wide range of customizable icons for our applications.
-   **React-Query:** A powerful data-fetching library for managing server-state in our React applications.
-   **Lodash:** A JavaScript utility library that helps us write cleaner and more efficient code.
-   **React Router Dom:** A JavaScript utility library that helps to create routes.

## Getting Started

To get started with our project, please follow the steps below:

1. **Install Package Manager:**

    ```bash
    corepack enable
    yarn init -2
    yarn set version stable
    yarn install
    yarn --version
    ```

2. **Clone the repository:**

    ```bash
    https://github.com/AkshayKDev/kitchen-magppie
    ```

3. **Install dependencies:**

    ```bash
    cd kitchen-magppie
    yarn
    ```

4. **Run the application:**

    ```bash
    yarn run dev
    ```

5. **Buiid application:**
    ```bash
    yarn build
    ```

## Fixing Yarn Package Manager Errors

Follow these steps to resolve errors with the Yarn package manager:

### Steps

1. **Remove `yarn.lock` and `.yarnrc.yml` files**

    ```sh
    rm yarn.lock .yarnrc.yml
    ```

2. **Enable Corepack**

    ```sh
    corepack enable
    ```

3. **Open the `package.json` file**

4. **Reinitialize Yarn with the latest version**

    ```sh
    yarn init -2
    ```

5. **Revert changes in the `package.json` file**
   Undo any unintended modifications in the `package.json` file that were caused by the previous step.

6. **Install dependencies**

    ```sh
    yarn install
    ```

7. **Start the development server**
    ```sh
    yarn dev
    ```

### Detailed Explanation

1. **Remove `yarn.lock` and `yarn.yml` files**: These files can sometimes cause conflicts or errors. Removing them ensures a clean slate for the next steps.

2. **Enable Corepack**: Corepack enables package managers (like Yarn) to be managed by Node.js, ensuring compatibility and version management.

3. **Open `package.json`**: Check the `package.json` file for any anomalies or errors that might be causing issues.

4. **Reinitialize Yarn with the latest version**: Running `yarn init -2` initializes a new Yarn project with the latest Yarn 2 configuration.

5. **Revert changes in the `package.json` file**: The initialization step might alter your `package.json`. Ensure it matches your project's requirements by reverting any unnecessary changes.

6. **Install dependencies**: This step installs all the necessary packages defined in your `package.json`.

7. **Start the development server**: Finally, start your development server to ensure everything is running smoothly.

By following these steps, you can resolve common issues with Yarn and ensure your project dependencies are properly managed.
