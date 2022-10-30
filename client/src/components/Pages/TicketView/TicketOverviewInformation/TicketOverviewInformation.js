import AggregativeBlocks    from './AggregativesBlocks';
import AggregativeSelectors from './AggregativesSelectors';

import texts from '../../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function TicketOverviewInformation ({ ticket_data_utils, all_population_data }) {
    // Aliases
    const language   = all_population_data.language;
    const ticketData = ticket_data_utils.ticketData;
    
    return (
    <div id='TV-ticket-info-container' css-marker="INF">
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.ticket_creator[language]}: <span>{ticketData.creator_name}</span></p>
            <p className='TV-INF-line-info-value'>{texts.creation_date[language]}:  <span>{AF.date_formater(ticketData.creation_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.ticket_id[language]}: <span> #{ticketData.id}</span></p>
            <p className='TV-INF-line-info-value'>{texts.due_date[language]}:  <span>{ticketData.due_date ? AF.date_formater(ticketData.due_date) : "--"}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>Status: <span>{texts[ticketData.status][language]}</span></p>
            <p className='TV-INF-line-info-value'>{texts.last_update_date[language]}: <span>{AF.date_formater(ticketData.last_status_update_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.priority[language]}:       <span>{texts[ticketData.priority][language]}</span></p>
            <p className='TV-INF-line-info-value'>{texts.concluded_date[language]}: <span>{ticketData.status === "Concluded" ? AF.date_formater(ticketData.last_status_update_date) : "--"}</span></p>
        </div>
        <div id='TV-INF-aggregatives-container'>
            <div className='TV-INF-info-line-direct-container'>
                <AggregativeBlocks    which_aggregative="groups" all_population_data={all_population_data} ticket_data_utils={ticket_data_utils}/>
                <AggregativeSelectors which_aggregative="groups" all_population_data={all_population_data} ticket_data_utils={ticket_data_utils} />
            </div>
            <div className='TV-INF-info-line-direct-container'>
                <AggregativeBlocks    which_aggregative="assumers" all_population_data={all_population_data} ticket_data_utils={ticket_data_utils}/>
                <AggregativeSelectors which_aggregative="assumers" all_population_data={all_population_data} ticket_data_utils={ticket_data_utils} />
            </div>
        </div>
    </div>
    )
}

export default TicketOverviewInformation