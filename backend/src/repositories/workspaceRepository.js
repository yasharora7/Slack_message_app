import Workspace from "../schema/workspace.js";
import crudRepository from "./crudRepository.js";
import ClientError from '../utils/errors/clientError.js';
import User from '../schema/user.js'
import { StatusCodes} from 'http-status-codes'

const workspaceRepository = {
    ...crudRepository(Workspace),
    getWorkspaceByName: async function (workspaceName) {
        const workspace= await Workspace.findOne({name:workspaceName});

        if(!workspace){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        return workspace;
    },
    getWorkspaceByJoinCode: async function (joinCode) {
        const workspace= await Workspace.findOne(joinCode);

        if(!workspace){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        return workspace;
    },
    addMemberToWorkspace: async function (workspaceId, memberId, role) {
        const workspace= await Workspace.findOne(workspaceId);

        if(!workspace){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isValidUser  = await Workspace.findOne(memberId);

        if(!isValidUser){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'User not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

         const isMembereAlreadyPartOfWorkspace = workspace.members.find((member)=> member.memberId==memberId);

        if(isMembereAlreadyPartOfWorkspace){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'User already part of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }

        workspace.members.push({
            memberId,
            role
        });

        await workspace.save();

        return workspace;
    },
    addChannelToWorkspace: async function (workspaceId, channelName) {
            const workspace = await Workspace.findById(workspaceId).populate('channels');

            if(!workspace){
                 throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
            }

            const isChannleAlreadyPartOfWorkspace = workspace.channels.find((channel)=> channel.name ===channelName);

            if(isChannelAlreadyPartOfWorkspace){
                throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Channel already part of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
            }

            const channel = await channelRepository.create({name: channelName});
            
            workspace.channels.push(channel);
            await workspace.save();

            return workspace;
    },
    fetchAllWorkspaceByMembeId: async function (memberId) {
        const workspaces = await Workspace.find({
            'members.memverId': memberId
        }).populate('members.memberId', 'username email avatar')
    },
};

export default workspaceRepository;