# Tailwind

Tailwind is a utility-first CSS framework for rapidly building custom designs. It's a great fit for teams who are building a design system and want to maintain a consistent look and feel across their entire application. It's also a great fit for teams who are working on a large application and want to be able to quickly iterate on designs without having to write custom CSS.

This library is a custom configuration of Tailwind CSS for use in applications built by Jason Ruesch.

## Getting started

To use Tailwind in your application, you need to install the `@jasonruesch/tailwind` package:

```bash
npm install @jasonruesch/tailwind
```

Once installed, you can use the `@jasonruesch/tailwind` package to generate a `tailwind.config.js` file in your project:

```bash
npx tailwindcss init
```

This will create a `tailwind.config.js` file in your project root. You can use this file to customize your Tailwind installation.

## Customizing Tailwind

The `tailwind.config.js` file is where you can import and use this library as a preset.

```javascript
module.exports = {
  presets: [require('@jasonruesch/tailwind')],
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    // ...
  ],
};
```

You can learn more about configuring Tailwind by reading the [documentation](https://tailwindcss.com/docs/configuration).
