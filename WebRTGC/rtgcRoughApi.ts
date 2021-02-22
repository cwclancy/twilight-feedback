/*
    RTGC Context

    Real Time Group Communication (RTCG) is an API for web based group audio
    and video communication. It allows for the quick development of browser-based
    video conferencing applications. Most importantly it allows for natural conversation
    via groups which allow for "side-conversations" in a video conference.

    A Room is a place where the conversation takes place. A Room can have host who is 
    heard by all Participants in said Room, at all times. The Participants in a Room
    can form Groups. In these Groups they can speak among themselves without being
    heard by Participants not in their group, or the host. 

    These functions use the idea of a user, which is a Twilight User. For the general
    purpose of this API, they are only necessary is UIDs for Participants and can be 
    replaced with any UID.
*/

/*
    The Room class represents a place for participants to communicate. 
*/

type Room = {
    /*
        addGroups - Creates groups from the groupInfos parameter for the Room. 
        The function returns an array of all of the groups in the Room.

        groupInfos - an array of GroupInfo that will be used to creates Groups for the room
    */
    addGroups: (groupInfos: Array<GroupInfo>) => Array<Group>
    /*
        addHost - Adds username as a host for the Room. A participant whose user.username field matches
        the passed in username is a host after joining the Room.

        username - username of a host for the Room
    */
    addHost: (username: User) => void
    /*
        addUsersToAllowedUsers - Adds the users to the allow list for the Room, if no users
        are added with this function call the Room will be open for anyone to join. The function
        returns an array of all of the allowed users for the Room.

        users - Array of users who are allowed to join the room.
    */
    addUsersToAllowedUsers: (users: Array<User>) => Array<User>
    /*
        allowedUsers - Returns an array of the users who are allowed in the room. If no users have been added
        with the function addUsersToAllowedUsers, this function will return an empty Array. 
    */
    allowedUsers: () => Array<User>
    /*
        close - Closes the room. After close is called all Participants will be removed from the room. This should
        be called when you are done with the Room.
    */
    close: () => void
    /*
        defaultGroup - the group all participants are put in by default. 
    */
    defaultGroup: Group
    /*
        getRoomCode - Returns a string of the unique room code.
    */
    getRoomCode: () => string
    /*
        getShareUrl - Returns a string of a sharable URL that will allow users to join your room.
    */
    getShareUrl: () => string
    /*
        groups - Returns an array of all of the groups in the Room.
    */
    groups: () => Array<Group>
    /*
        hosts - returns an array of the hosts of the room
    */
    hosts: Array<Participant>
    /*
        muteParticipants - mutes the audio of all participants other than the host(s). 
    */
    muteParticipants: () => void
    /*
        onParticipantConnected - calls participantConnected when a new participant connects to a room.
        this is not called on participants already in the room. It is common start this listener after
        doing the action on room.participants()

        participantConnected - a function that takes a participant and does some action. This is run
        every time a new participant connects to the room.
    */
    onParticipantConnected: (participantConnected: (participant: Participant) => void) => void
    /*
        onParticipantDisconnected - calls participantDisconnected when a participants disconnects from the room.

        participantDisconnected - a function that takes a participants and does some action. It is run when
        a participant disconnects from the room.
    */
    onParticipantDisconnected: (participantDisconnected: (participant: Participant) => void) => void
    /*
        participants - Returns an array of all of the participants in the Room.
    */
    participants: () => Array<Participant>
}

type Group = {
    /*
        close - call when a group will not be used any longer. This function shuts down
        the group and does any clean up related to it. After a group is closed it can no longer
        be joined, and any participants in the group will be moved to the group they were in before joining
        this closed group.
    */
    close: () => void
    /*
        getGroupCode - returns a UID for the group.
    */
    getGroupCode: () => string
    /*
        inviteParticipant - sends an invitiation to a participant that if they accept, they will be added to 
        the group that the invitation originated from.

        participant - the participant to be added to the group
    */
    inviteParticipant: (participant: Participant) => Group
    /*
        invitedParticipants - returns an array of participants who have been invited to the group
    */
    invitedParticipants: () => Array<Participant>
    /*
        onParticipantJoinedGroup - the function participantJoinedGroup will run every time a new participant joins
        the group. This function is used to do things like update the group view to include a newly added participant.

        participantJoinedGroup - a function that takes in a participant and returns void, this function is run 
        every time a new participant joins the group.
    */
    onParticipantJoinedGroup: (participantJoinedGroup: (participant: Participant) => void) => void
    /*
        onParticipantLeftGroup - the function participantLeftGroup will be run every time a participant leaves the group.
        This function is typically used to update the group view to remove a participant who left.

        participantLeftGroup - a function that takes in a participant and returns void, this function is run
        every time a participant leaves the group.
    */
    onParticipantLeftGroup: (participantLeftGroup: (participant: Participant) => void) => void
    /*
        participants - returns an array of the participants who are in the group. This does not include participants 
        who have been invited, but have not accepted.
    */
    participants: () => Array<Participant>
}

type Participant = {
    /*
        addTrackToDiv - adds a participants audio and video tracks to the specified div element. If
        a user has not allowed video, the div is filled with a default background. If a user has not 
        allowed audio (or is muted), a not sharing audio icon will appear. HTMLDivElement passed in
        will have its id property set to the participants username.

        <b>Important:</b> user must have allowed and selected their audio and video source before 
        thsi function will work as expected

        div - the html div element to add to the tracks to and give id participants username.
    */
    addTrackToDiv: (div: HTMLDivElement) => void
    /*
        audioStream - returns the participants audio source if it has been setup with setAudioStream, otherwise it returns null.
    */
    audioStream: () => AudioStream | null
    /*
        createGroup - creates a new group with the participant who called createGroup, the new group is returned by this function.
    */
    createGroup: () => Group
    /*
        currentGroup - returns the current group the participant is in, or null if they are not in a group.
    */
    currentGroup: () => Group | null
    /* 
        currentRoom - returns the current room the participant is in, or null if they are not in a room.
    */
    currentRoom: () => Room | null
    /*
        muteAudio - mutes the participants audio stream. This participant's audio is then muted for all other participants in the group or room.
    */
    muteAudioForAll: () => void
    /*
        muteVideo - mutes the participants video stream. This participant's video is then muted for all other participants in the group or room.
    */
    muteVideoForAll: () => void
    /*
        previousGroups - returns an array of all of the groups the participant has been in since joining the current room.
        This list includes the current group the participant is in. The array is ordered from most recently joined group to least
        recently joined group (i.e. [groupIJustJoined, groupFromALittleBefore, defaultRoomGroup]). If the participant has not joined
        any groups in the room, this function returns null.
    */
   previousGroups: () => Array<Group> | null
    /*
        requestAudioSources - this promise resolves with either an array of the participants available audio sources that can be used
        to set the participant's audio stream or an error that permission was denied.
    */
    requestAudioSources: () => Promise<Array<AudioSource>>
    /*
        requestVideoSources - this promise resolves with either an array of the participants available video sources that can be used
        to set the participant's video stream or an error that permission was denied.
    */
    requestVideoSources: () => Promise<Array<VideoSource>>
    /*
        setAudioStream - this takes in an audio source and sets it as the audio source for the pariticipant. This is the audio
        source that will be made available to other participants in the room.
    */
    setAudioStream: (audioStream: AudioSource) => boolean
    /*
        setVideoStream - this takes a video source and sets it as the video source for the participant. This is the video source
        that will be made available to other participants in the room.
    */
    setVideoStream: (videoStream: VideoSource) => boolean
    /*
        tryJoinGroup - this function takes a group code and returns a promise resolving to either the group that the participant 
        joined, or an error signaling the participant was unable to join the group.
    */
    tryJoinGroup: (groupCode: string) => Promise<Group>
    /*
        tryJoinRoom - this function takes a room code and returns a promise resolving the either the room that the participant
        joined, or an error signaling the participant was unable to join the room.
    */
    tryJoinRoom: (roomCode: string) => Promise<Room>
    /*
        tryLeaveGroup - this function takes a group code and removes the participant from the group and returns true. If the participant is not
        in the group specified the function returns false.
    */
    tryLeaveGroup: (groupCode: string) => boolean
    /*
        tryLeaveRoom - this function takes a room code, removes the participant from the room, and returns true. If the pariticpant is not 
        in the room speficied the function returns false.
    */
    tryLeaveRoom: (roomCode: string) => boolean
    /*
        unmuteAudio - unmutes the participants audio source. This participant's audio is then unmuted for all other participants in the group or room.
    */
    unmuteAudioForAll: () => void
    /*
        unmuteVideo - unmutes the participants video source. This participant's video is then muted for all other participants in the group or room.
    */
    unmuteVideoForAll: () => void
    /*
        userInfo - returns the twilight user info object uniquely identifying the participant. 
    */
    userInfo: User
    /*
        videoStream - returns the participants video stream if it has been set by setVideoStream, otherwise it returns null.
    */
    videoStream: () => VideoStream | null
}

type AudioSource = {}
type AudioStream = {} 
type GroupInfo = {}
type User = {username: string}
type VideoSource = {}
type VideoStream = {}

/*
    Examples
    (need to learn how to do this in general with webrtc before doing more)
*/

// Participant Video in Gallery View Room, simple, no group shit
function participantGalleryViewExample(room: Room): void {
    room.participants().forEach(participantConnected)
    room.onParticipantConnected(participantConnected)
    room.onParticipantDisconnected(participantDisconnected)
    function participantConnected(participant: Participant): void {
        const div = document.createElement('div')
        participant.addTrackToDiv(div)
        document.body.appendChild(div)
    }
    function participantDisconnected(participant: Participant): void {
        const leavingDiv = document.getElementById(participant.userInfo.username)
        leavingDiv.remove()
    }
}

// show a room for a participant when they are in a group
function updateParticipantView(room: Room, participant: Participant): void {
    // remove current peoples view
    room.participants().forEach((participant: Participant): void => {
        try {
            document.getElementById(participant.userInfo.username).remove()
        } catch {
            console.warn('trying to remove participant who doesn\'t exist')
        }
    })
    // put the hosts into their on div so they get seen by both people in custom groups
    // and by people in the default group
    const hostsDiv = document.createElement('div')
    room.hosts.forEach((host: Participant): void => {
        host.addTrackToDiv(hostsDiv)
    })

    // get the members in the participants current group, 
    participant.currentGroup().participants().forEach(participantConnectedToGroup)
    participant.currentGroup().onParticipantJoinedGroup(participantConnectedToGroup)
    participant.currentGroup().onParticipantLeftGroup(participantDisconnectedFromGroup)

    function participantConnectedToGroup(participant: Participant): void {
        const div = document.createElement('div')
        participant.addTrackToDiv(div)
        document.body.appendChild(div)
    }
    function participantDisconnectedFromGroup(participant: Participant): void {
        const leavingDiv = document.getElementById(participant.userInfo.username)
        leavingDiv.remove()
    }
}

// show what happens when a participant joins a new group
function participantJoinsNewGroup(room: Room, group: Group, participant: Participant): void {
    // move to some sort of joining state while we wait for the try join group
    participant.tryJoinGroup(group.getGroupCode()).then((group) => {
        updateParticipantView(room, participant)
    }).catch(error => {
        console.log(error)
    })
}


// Participant Video Gallery View with Group Shit :))
function participantCreatesAGroup(room: Room, participant: Participant): void {
    const newGroup = participant.createGroup()
    participantJoinsNewGroup(room, newGroup, participant)
}

function participantInvitesToGroup(room: Room, participant: Participant): void {
    participant.currentGroup().inviteParticipant(participant.currentRoom().participants()[1])
}

// what does this look like in a react app? This will have to be in documentation somewhere else

function setupParticipantAudioAndVideo(participant: Participant): void {
    // this will normally happen at the very beginning
    participant.requestAudioSources().then(audioSources => {
        participant.setAudioStream(audioSources[0])
    }).catch(error => {
        console.log('no audio rip')
    })

    participant.requestVideoSources().then(videoSources => {
        participant.setVideoStream(videoSources[0])
    }).catch(error => {
        console.log('no video rip')
    })
}
