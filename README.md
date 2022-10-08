<h1>Ticket Management System Application - https://zktickets.herokuapp.com</h1>

<h3>General Information:</h3>
</br>
<h3>Instructions & Documentation:</h3>
</br>
<h4><ins>Code Reading Instructions (CLIENT):</ins></h4>
</br>
<strong>ALL Camel Cased</strong> variables are <strong>STATE</strong> variables (current state or updater). Examples:
</br>
</br>

- allTickets
- updateAllTickets
</br>
<strong>ALL</strong> Uppercased <strong>Snake Cased</strong> variables are <strong>GLOBAL CONSTANT</strong> variables. Example:
</br>
</br>

- MAX_NUMBER_OF_TICKETS_PER_PAGE
</br>

<strong>ALL rest of code is Snake Cased</strong>. Example:

- update_all_tickets
</br>

<h4><ins>Code Files Information (CLIENT):</ins></h4>
</br>
Most of components have an auxiliary code file with the same exact name, but snake cased. Example:
</br>
</br>

- Component file -> TicketBand.js
- Auxiliary File -> ticket_band.js
</br>

These files are meant for the under curtains processing code, while the Components contains the logic execution code.

These auxiliary files are mainly a bunch of functions with descriptive name which are then called in the Component.
</br>
</br>

<h4><ins>Language Code Structure (CLIENT):</ins></h4>
</br>

As already mentioned, absolutely NO framework was used in this project, which means, the languages implementation is "handmade".

That said, the languages are configured as JSON files containing all texts and imported inside the Components, where they are then used, instead of pure static text.

They are matched with the [language] state dynamically (object hash map), so, "in real time" as experience. Although very demanding to be firstly implemented, as one needs to write all texts JSON, there are some surely benefits:
</br>
</br>

- <strong>Easy to maintain</strong> after done (Adding new texts / new Components).
- <strong>Extremely light</strong> (Tiny String JSONs).
- <strong>Instantly Switch</strong> (As the texts are all already loaded during user usage of the application).
- <strong>Easy to implement</strong>, in terms of complexity.
- <strong>Very precise translation</strong> (As one writes real "human" language translations and decides what is really going to be shown).
</br>
<h4><ins>Ticket Filters Structure (CLIENT):</ins></h4>
</br>

The filters works divided in <strong>levels</strong>. Currently, there are two: <strong>main tree filters</strong> and <strong>lower filters</strong>.

Filters in the <strong>SAME LEVEL</strong> are always <strong>"OR"</strong> conditioned. Filters In <strong>DIFFERENT LEVEL</strong> are always <strong>"AND"</strong> conditioned:

The filters always <strong>INCLUDES</strong> tickets, <strong>AS LONG AS</strong> upper level filters are satisfied as well. In case a filter is active, and no lower level filter is active, then all tickets are considered for those.

So, for example, if we had a main tree filter active and no lower filter active, then all tickets that belong to that main tree filter will be shown.

In the same example, if now, we activated, together with the main tree filter, also a lower filter, "deleted tickets", then, <strong>ONLY</strong> tickets that belong to the active main tree filter <strong>AND</strong> is deleted will be shown.

And still, if we now added another lower filter, for example "concluded tickets", the same logic will follow: <strong>ONLY</strong> tickets that belong to the main tree filter <strong>AND</strong> is a deleted <strong>OR</strong> concluded ticket will be shown.
