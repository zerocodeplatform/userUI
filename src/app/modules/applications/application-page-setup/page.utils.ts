import { FormlyFieldConfig } from '@ngx-formly/core';

const blockFieldConfig: FormlyFieldConfig[] = [
    {
        className: 'ui-g-4',
        fieldGroup: [
            {
                key: 'blockName',
                type: 'input',
                wrappers: ['label'],
                templateOptions: {
                    label: 'Block Name',
                    placeholder: 'Enter A Block Name',
                    required: true,
                },
            },
            {
                key: 'class',
                type: 'input',
                wrappers: ['label'],
                templateOptions: {
                    label: 'Class Name',
                    placeholder: 'Enter A Class Name',
                },
            },
            {
                key: 'padding',
                type: 'input',
                wrappers: ['label'],
                templateOptions: {
                    label: 'Padding',
                    placeholder: '10px',
                },
            },
            {
                key: 'margin',
                type: 'input',
                wrappers: ['label'],
                templateOptions: {
                    label: 'Margin',
                    placeholder: '10px',
                },
            },
            {
                className: 'ui-g-6',
                fieldGroup: [
                    {
                        key: 'isBackgroundColor',
                        type: 'boolean',
                        wrappers: ['label'],
                        className: 'ui-g-12',
                        templateOptions: {
                            label: 'Background'
                        }
                    },
                    {
                        key: 'backgroundColor',
                        type: 'input',
                        wrappers: ['label'],
                        hideExpression: '!model.isBackgroundColor',
                        templateOptions: {
                            label: 'Color'
                        }
                    },
                    {
                        key: 'image',
                        type: 'input',
                        wrappers: ['label'],
                        hideExpression: '!model.isBackgroundColor',
                        templateOptions: {
                            label: 'Background Image'
                        }
                    }
                ]
            },
            {
                className: 'ui-g-6',
                fieldGroup: [
                    {
                        key: 'isBorder',
                        type: 'boolean',
                        templateOptions: {
                            label: 'Border'
                        },
                    },
                    {
                        key: 'borderStyle',
                        type: 'select',
                        hideExpression: '!model.isBorder',
                        templateOptions: {
                            label: 'Type',
                            additionalProperties: { key: 'value' },
                            options: [{ label: 'Solid', value: 'solid' }, { label: 'Dotted', value: 'dotted' }]
                        },
                    },
                    {
                        key: 'borderWidth',
                        type: 'input',
                        wrappers: ['label'],
                        hideExpression: '!model.isBorder',
                        templateOptions: {
                            label: 'Width',
                            placeholder: '1 px'
                        },
                    },
                    {
                        key: 'borderColor',
                        type: 'input',
                        wrappers: ['label'],
                        hideExpression: '!model.isBorder',
                        templateOptions: {
                            label: 'Color',
                            placeholder: '#000000'
                        },
                    }
                ]
            },

        ]
    },
    {
        className: 'ui-g-4',
        fieldGroup: [
            {
                key: 'blockHeight',
                fieldGroup: [
                    {
                        template: 'Block Height'
                    },
                    {
                        key: 'lg',
                        type: 'input',
                        templateOptions: {
                            label: 'Desktop',
                            placeholder: '300 px',
                        },
                    },
                    {
                        key: 'md',
                        type: 'input',
                        templateOptions: {
                            label: 'TAB',
                            placeholder: '300 px',
                        },
                    },
                    {
                        key: 'sm',
                        type: 'input',
                        templateOptions: {
                            label: 'Mobile',
                            placeholder: '300 px',
                        },
                    }
                ]
            },
            {
                key: 'blockWidth',
                fieldGroup: [
                    {
                        template: 'Block Width'
                    },
                    {
                        key: 'lg',
                        type: 'input',
                        templateOptions: {
                            label: 'Desktop',
                            placeholder: 'ui-lg-6',
                        },
                    },
                    {
                        key: 'md',
                        type: 'input',
                        templateOptions: {
                            label: 'TAB',
                            placeholder: 'ui-md-6',
                        },
                    },
                    {
                        key: 'sm',
                        type: 'input',
                        templateOptions: {
                            label: 'Mobile',
                            placeholder: 'ui-sm-6',
                        },
                    }
                ]
            }
        ]
    },
    {
        className: 'ui-g-4',
        fieldGroup: [
            {
                key: 'columns',
                fieldGroup: [
                    {
                        template: 'Number of Columns'
                    },
                    {
                        key: 'lg',
                        type: 'input',
                        templateOptions: {
                            label: 'Desktop',
                            placeholder: '300 px',
                        },
                    },
                    {
                        key: 'md',
                        type: 'input',
                        templateOptions: {
                            label: 'TAB',
                            placeholder: '300 px',
                        },
                    },
                    {
                        key: 'sm',
                        type: 'input',
                        templateOptions: {
                            label: 'Mobile',
                            placeholder: '300 px',
                        },
                    }
                ]
            }

        ]
    }

];
const widgetLoginFieldConfig: FormlyFieldConfig[] = [
    {
        key: 'title',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'Title',
            placeholder: 'Enter A Title',
        }
    },
    {
        key: 'navigateTo',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'Navigate Url',
            placeholder: 'Enter A Url',
            required: false
        }
    },
    {
        key: 'btnLabel',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'Button Label Name',
            placeholder: 'Enter A Button Label Name',
        }
    },

];
const widgetHtmlFieldConfig: FormlyFieldConfig[] = [
    {
        key: 'template',
        type: 'textarea',
        className: 'ui-g-6',
        wrappers: ['label'],
        templateOptions: {
            label: 'Html',
            placeholder: 'Enter A Block Name',
        }
    }

];
const widgetImageFieldConfig: FormlyFieldConfig[] = [
    {
        key: 'url',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'URL',
            placeholder: 'Enter URL',
        }
    },
    {
        key: 'height',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'Height',
            placeholder: 'Enter Heigth',
        }
    },
    {
        key: 'width',
        type: 'input',
        className: 'ui-g-4',
        wrappers: ['label'],
        templateOptions: {
            label: 'Width',
            placeholder: 'Enter Width',
        }
    }

];

const pageUtils = {
    blockFieldConfig: blockFieldConfig,
    widgetLoginFieldConfig: widgetLoginFieldConfig,
    widgetHtmlFieldConfig: widgetHtmlFieldConfig,
    widgetImageFieldConfig: widgetImageFieldConfig
};
export {
    pageUtils
};
