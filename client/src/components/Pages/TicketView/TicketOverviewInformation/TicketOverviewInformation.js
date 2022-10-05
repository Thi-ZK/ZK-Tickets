import AggregativeBlocks    from './AggregativesBlocks';
import AggregativeSelectors from './AggregativesSelectors';

import texts from '../../../../languages/Pages/TicketView/TicketOverViewInformation.json';
import AF    from '../../../../components_aux_functions/pages/ticket_view/ticket_overview_information.js'; // Aux Functions

function TicketOverviewInformation ({ ticket_data, aggregatives_utils, language, userData }) {
    // Alias For Aggregative Blocks Components Props
    const data_for_aggregatives = {
        ticket_data:        ticket_data,
        aggregatives_utils: aggregatives_utils,
        language:           language,
        userData:           userData
    };
    
    return (
    <div id='TV-ticket-info-container' css-marker="INF">
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.ticket_creator[language]}: <span>{ticket_data.creator_name}</span></p>
            <p className='TV-INF-line-info-value'>{texts.creation_date[language]}:  <span>{AF.date_formater(ticket_data.creation_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.ticket_id[language]}: <span> #{ticket_data.id}</span></p>
            <p className='TV-INF-line-info-value'>{texts.due_date[language]}:  <span>{ticket_data.due_date ? AF.date_formater(ticket_data.due_date) : "--"}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>Status: <span>{texts[ticket_data.status][language]}</span></p>
            <p className='TV-INF-line-info-value'>{"Last Status Update Date"}: <span>{AF.date_formater(ticket_data.last_status_update_date)}</span></p>
        </div>
        <div className='TV-INF-info-line-direct-container'>
            <p className='TV-INF-line-info-key'>  {texts.priority[language]}:       <span>{texts[ticket_data.priority][language]}</span></p>
            <p className='TV-INF-line-info-value'>{texts.concluded_date[language]}: <span>{ticket_data.status === "Concluded" ? AF.date_formater(ticket_data.last_status_update_date) : "--"}</span></p>
        </div>
        <div id='TV-INF-aggregatives-container'>
            <div className='TV-INF-info-line-direct-container'>
                <AggregativeBlocks    which_aggregative="groups" data_for_aggregatives={data_for_aggregatives}/>
                <AggregativeSelectors which_aggregative="groups" data_for_aggregatives={data_for_aggregatives} />
            </div>
            <div className='TV-INF-info-line-direct-container'>
                <AggregativeBlocks    which_aggregative="assumers" data_for_aggregatives={data_for_aggregatives}/>
                <AggregativeSelectors which_aggregative="assumers" data_for_aggregatives={data_for_aggregatives} />
            </div>
        </div>
    </div>
    )
}

export default TicketOverviewInformation