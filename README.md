<h1>Ticket Management System Application - https://zktickets.herokuapp.com</h1>

<h3>General Information:</h3>
<h4><ins>General Overview Of Project Implementation:</ins></h4>
</br>
The application is completely hand made, which means absolutely no framework (excepting react.js & axios, of course) and no external libraries were used for any purpose. The only tiny exception, is the react calendar.
</br>
</br>
Languages, All CSS & Responsiveness, Dark / Bright Themes, Pagination, Filters & so on were all hand made.
</br>
</br>
The project purpose was mainly to learn (as it is my very first react application and first contact with react) and to serve as a "portfolio" for job interviews.
</br>
</br>
<h3>Instructions & Documentation:</h3>
<h4><ins>How To Run It Locally?</ins></h4>
</br>
One can simply run the application completely normally in the local host:
</br>
</br>
- In the server level folder, run: node server.js (or nodemon)
</br>
- In the client level folder, run: npm start
</br>
</br>
The very only thing to be done when doing so, is switching the commented code line in the axios API file, to match the correct domain.
</br>
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
<h4><ins>Strictness & Power System:</ins></h4>
</br>
In the application, the users have power indexes, that dictates what they can or can not do in it. 
</br>

The indexes goes from 1 to 4:
</br>
</br>
- 1 - User is not allowed to do anything, just to see the content.
- 2 - Blank. To be configured in case more specifications are desired in the future.
- 3 - User is allowed to perform many actions.
- 4 - Admin power. User is allowed to do anything he/she wants.
</br>
Inside the Components or Middlewares one can find legitimacy check functions. They exist to prevent action from user, in case he/she is not legit for the action. There are four types of those:
</br>
</br>
</br>

- <strong>check_user_legitimacy_no_strict</strong> - Any user is allowed to performed the action, as long as it has power above 2.
- <strong>check_user_legitimacy</strong> - User is allowed to perform action, as long as he/she is generally related to the ticket (assigned or creator).
- <strong>check_user_legitimacy_strict</strong> - User is allowed to perform the action, as long as he/she is the ticket creator OR the action directly owner.
- <strong>check_user_legitimacy_max_strict</strong> - User is only allowed to perform action, as long as he/she is the ticket creator.
</br>
Admins can always perform the action, doesn't matter which. All the three last functions already checks if the user is at least power 2. 
</br>
</br>
<h4><ins>Ticket Filters Structure (CLIENT):</ins></h4>
</br>

The filters works divided in <strong>levels</strong>. Currently, there are two: <strong>main tree filters</strong> and <strong>lower filters</strong>.

Filters in the <strong>SAME LEVEL</strong> are always <strong>"OR"</strong> conditioned. Filters In <strong>DIFFERENT LEVEL</strong> are always <strong>"AND"</strong> conditioned:

The filters always <strong>INCLUDES</strong> tickets, <strong>AS LONG AS</strong> upper level filters are satisfied as well. In case a filter is active, and no lower level filter is active, then all tickets are considered for those.

So, for example, if we had a main tree filter active and no lower filter active, then all tickets that belong to that main tree filter will be shown.

In the same example, if now, we activated, together with the main tree filter, also a lower filter, "deleted tickets", then, <strong>ONLY</strong> tickets that belong to the active main tree filter <strong>AND</strong> is deleted will be shown.

And still, if we now added another lower filter, for example "concluded tickets", the same logic will follow: <strong>ONLY</strong> tickets that belong to the main tree filter <strong>AND</strong> is a deleted <strong>OR</strong> concluded ticket will be shown.
