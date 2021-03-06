import * as d3 from "d3-selection";
import * as d3plus from "d3plus-text";
import merge from "lodash/merge";

export default function (chart, models, cfg) {
    return chart
        .selectAll("g.model")
        .data(models)
        .join("g").each(render(cfg))
        .attr("class", _ => `model ${_.archetype}`)
        .attr("id", _ => _.id);
}

function render(cfg) {
    return function (model) {
        let config = findConfig(model, cfg);
        renderBackground(this, model, config);
        renderTextBoxes(this, model, config);
    }
}

function renderTextBoxes(container, model, config) {
    new d3plus.TextBox()
        .data(texts(model, config))
        .width(config.shape.width)
        .height(config.shape.height)
        .fontResize(_ => _.resize)
        .fontColor(_ => _.font.color)
        .fontSize(_ => _.font.size)
        .fontFamily(_ => _.font.family)
        .verticalAlign('middle')
        .textAnchor('middle')
        .y((d, i) => (i - 1) * config.shape.height / 3)
        .select(container)
        .render();
}

function texts(model, config) {
    return [
        {text: ['<', model.archetype, '>'].join(' '), resize: false, font: config.archetype},
        {text: model.id, resize: true, font: config.name},
        {text: model.attributes.map(_ => _.name).join(' '), resize: false, font: config.attributes}
    ];
}

function renderBackground(container, model, config) {
    d3.select(container)
        .append('rect')
        .attr('class', 'background')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', config.shape.width)
        .attr('height', config.shape.height)
        .attr('rx', config.shape.corner_radius)
        .attr('ry', config.shape.corner_radius)
        .attr('fill', config.fill);
}

function findConfig(model, config) {
    return merge({}, config.models.defaults, config.models[model.archetype] || {});
}