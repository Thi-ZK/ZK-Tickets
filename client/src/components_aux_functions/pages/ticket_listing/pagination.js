// Generate Total Indexes Blocks (Array) (Array For Easier Loop)
const gen_total_page_blocks = (all_tickets) => {
    let blocks_number = Math.floor(all_tickets.length / 2);

    return Array.from(Array(blocks_number).keys());
}

module.exports = {
    gen_total_page_blocks: gen_total_page_blocks,
};