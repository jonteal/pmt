const Client = require("../models/Client");
const Project = require("../models/Project");
const ActivityComment = require("../models/ActivityComment");
const Ticket = require("../models/Ticket");
const Kanban = require("../models/Kanban");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLEnumType,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    notes: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    createdAt: { type: GraphQLString },
    startDate: { type: GraphQLString },
    deadline: { type: GraphQLString },
    clientBudget: { type: GraphQLString },
    projectEstimate: { type: GraphQLString },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    emailAddress: { type: GraphQLString },
    companyName: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// ActivityComment Type
const ActivityCommentType = new GraphQLObjectType({
  name: "ActivityComment",
  fields: () => ({
    id: { type: GraphQLID },
    commentText: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
  }),
});

// Ticket type
const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    kanban: {
      type: KanbanType,
      resolve(parent, args) {
        return Kanban.findById(parent.kanbanId);
      },
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

// Kanban Type
const KanbanType = new GraphQLObjectType({
  name: "Kanban",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId);
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    activityComments: {
      type: new GraphQLList(ActivityCommentType),
      resolve(parent, args) {
        return ActivityComment.find();
      },
    },
    activityComment: {
      type: ActivityCommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return ActivityComment.findById(args.id);
      },
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve(parent, args) {
        return Ticket.find();
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      },
    },
    kanbans: {
      type: new GraphQLList(KanbanType),
      resolve(parent, args) {
        return Kanban.find();
      },
    },
    kanban: {
      type: KanbanType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Kanban.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a Client
    addClient: {
      type: ClientType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatus",
            values: {
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
            },
          }),
          defaultValue: "Prospect",
        },
      },
      resolve(parent, args) {
        const client = new Client({
          firstName: args.firstName,
          lastName: args.lastName,
          phoneNumber: args.phoneNumber,
          emailAddress: args.emailAddress,
          companyName: args.companyName,
          status: args.status,
        });

        return client.save();
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },

    // Edit a Client Name
    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        companyName: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ClientStatusUpdate",
            values: {
              prospect: { value: "Prospect" },
              current: { value: "Current" },
              former: { value: "Former" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              phoneNumber: args.phoneNumber,
              emailAddress: args.emailAddress,
              companyName: args.companyName,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Project
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        notes: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
        startDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        clientBudget: { type: GraphQLString },
        projectEstimate: { type: GraphQLString },
      },
      resolve(parent, args) {
        const project = new Project({
          title: args.title,
          description: args.description,
          status: args.status,
          notes: args.notes,
          clientId: args.clientId,
          startDate: args.startDate,
          deadline: args.deadline,
          clientBudget: args.clientBudget,
          projectEstimate: args.projectEstimate,
        });

        return project.save();
      },
    },

    // Delete an Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        ActivityComment.find({ projectId: args.id }).then(
          (activityComments) => {
            activityComments.forEach((activityComment) => {
              activityComment.remove();
            });
          }
        );
        Kanban.find({ projectId: args.id }).then(
          (kanbans) => {
            kanbans.forEach((kanban) => {
              kanban.remove();
            });
          }
        );
        return Project.findByIdAndRemove(args.id);
      },
    },

    // Update a Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        notes: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
        startDate: { type: GraphQLString },
        deadline: { type: GraphQLString },
        clientBudget: { type: GraphQLString },
        projectEstimate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              status: args.status,
              notes: args.notes,
              clientId: args.clientId,
              startDate: args.startDate,
              deadline: args.deadline,
              clientBudget: args.clientBudget,
              projectEstimate: args.projectEstimate,
            },
          },
          { new: true }
        );
      },
    },

    // Add a comment
    addActivityComment: {
      type: ActivityCommentType,
      args: {
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const activityComment = new ActivityComment({
          commentText: args.commentText,
          createdAt: args.createdAt,
          projectId: args.projectId,
        });

        return activityComment.save();
      },
    },

    // Delete a comment
    deleteActivityComment: {
      type: ActivityCommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return ActivityComment.findByIdAndRemove(args.id);
      },
    },

    // Add a Ticket
    addTicket: {
      type: TicketType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "TicketStatus",
            values: {
              pre: { value: "Ready" },
              middle: { value: "In Progress" },
              old: { value: "Done" },
            },
          }),
          defaultValue: "Ready",
        },
        kanbanId: { type: new GraphQLNonNull(GraphQLID) },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        const ticket = new Ticket({
          title: args.title,
          description: args.description,
          status: args.status,
          kanbanId: args.kanbanId,
          createdAt: args.createdAt,
        });

        return ticket.save();
      },
    },

    // Delete a ticket
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndRemove(args.id);
      },
    },

    // Update an ticket
    updateTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "TicketStatusUpdate",
            values: {
              pre: { value: "Ready" },
              middle: { value: "In Progress" },
              old: { value: "Done" },
            },
          }),
        },
        createdAt: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add a Kanban
    addKanban: {
      type: KanbanType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const kanban = new Kanban({
          title: args.title,
          description: args.description,
          projectId: args.projectId,
        });

        return kanban.save();
      },
    },

    // Delete a Kanban
    deleteKanban: {
      type: KanbanType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Ticket.find({ kanbanId: args.id }).then(
          (tickets) => {
            tickets.forEach((ticket) => {
              ticket.remove();
            });
          }
        );
        return Kanban.findByIdAndRemove(args.id);
      },
    },

    // Update a Kanban
    updateKanban: {
      type: KanbanType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        // projectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Kanban.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              // projectId: args.projectId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
