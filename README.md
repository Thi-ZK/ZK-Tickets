# ZK-Tickets
Ticket Management System Application - https://zktickets.herokuapp.com

General Information:



Instructions & Documentation:


  --  Code Reading Instructions (CLIENT):

ALL Camel Cased variables are STATE variables (current state or updater).                               Example: allTickets, updateAllTickets

ALL Uppercased Snake Cased variables are GLOBAL CONSTANT variables.                                     Example: MAX_NUMBER_OF_TICKETS_PER_PAGE

ALL Standard Snake Cased variables are general variables used in the components / auxiliary code files. Example: update_all_tickets


  --  Code Files Information (CLIENT):
  
Most of components have an auxiliary code file with the same exact name, but snake cased. Example: Component file -> TicketBand.js @@ Auxiliary File -> ticket_band.js

These files are meant for the under curtains processing code, while the Components contains the logic execution code.

These auxiliary files are mainly a bunch of functions with descriptive name which are then called in the Component.


  --  Language Code Structure (CLIENT):
  
As already mentioned, absolutely NO framework was used in this project, which means, the languages implementation is "handmade".

That said, the languages are configured as JSON files containing all texts and imported inside the Components, where they are then used, instead of pure static text.

They are matched with the [language] state dynamically, so, "in real time" as experience. Although very demanding to be firstly implemented, as one needs to write all texts JSON, there are some surely benefits:

- Easy to maintain after done (adding new texts / new Components).
- Very light usage (As it is just a few basically text loaded, which is extremely light).
- Real time usage (Almost instantanous, as the texts are already loaded and it is in the end just a string state update to change the language).
- Easier to implement, in terms of complexity.
- Very precise, as one writes real "human" language translations and decides what is really going to be shown.


  --  Ticket Filters Structure (CLIENT):

The filters works divided in levels. Currently, there are two: *main tree filters* and *lower filters*.

Filters in the SAME LEVEL are always "OR" conditioned. Filters In DIFFERENT LEVEL are always "AND" conditioned:

The filters always INCLUDES tickets, AS LONG AS upper filters are satisfied as well. In case a filter is active, and none of below filter is active, then all below are considered.

So for example, if we had a main tree filter active and no lower filter active, then all tickets that belong to that main tree filter will be shown.

In the same example, if now, we activated, together with the main tree filter, also a lower filter, "deleted tickets". Then, ONLY tickets that belong to the main tree filters active AND is a deleted will be shown.

And still, if we now added another lower filter, for example "concluded tickets", the same logic will follow: ONLY tickets that belong to the main three filter AND is a deleted OR concluded ticket will be shown.
