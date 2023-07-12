/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const { withContentlayer } = require('next-contentlayer');

const nextConfig = {};

module.exports = withContentlayer(withVanillaExtract(nextConfig));
