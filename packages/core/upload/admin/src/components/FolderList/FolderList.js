import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@strapi/design-system/Box';
import { KeyboardNavigable } from '@strapi/design-system/KeyboardNavigable';
import { Flex } from '@strapi/design-system/Flex';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { IconButton } from '@strapi/design-system/IconButton';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import Pencil from '@strapi/icons/Pencil';

import { FolderCard, FolderCardBody, FolderCardCheckbox, FolderCardLink } from '../FolderCard';
import { FolderDefinition } from '../../constants';

const CardTitle = styled(Typography).attrs({
  ellipsis: true,
  fontWeight: 'semiBold',
  textColor: 'neutral800',
  variant: 'omega',
})`
  max-width: 100%;
`;

export const FolderList = ({
  title,
  folders,
  size,
  onSelectFolder,
  onEditFolder,
  onClickFolder,
  selectedFolders,
}) => {
  return (
    <KeyboardNavigable tagName="article">
      {title && (
        <Box paddingTop={2} paddingBottom={2}>
          <Typography as="h2" variant="delta" fontWeight="semiBold">
            {title}
          </Typography>
        </Box>
      )}

      <Grid gap={4}>
        {folders.map(folder => {
          const isSelected = !!selectedFolders.find(
            currentFolder => currentFolder.id === folder.id
          );

          return (
            <GridItem col={3} key={`folder-${folder.uid}`}>
              <FolderCard
                ariaLabel={folder.name}
                id={`folder-${folder.uid}`}
                onDoubleClick={event => {
                  event.preventDefault();
                  onClickFolder(folder);
                }}
                startAction={
                  onSelectFolder && (
                    <FolderCardCheckbox
                      value={isSelected}
                      onChange={() => onSelectFolder({ ...folder, type: 'folder' })}
                    />
                  )
                }
                cardActions={
                  onEditFolder && (
                    <IconButton icon={<Pencil />} onClick={() => onEditFolder(folder)} />
                  )
                }
                size={size}
              >
                <FolderCardBody>
                  <FolderCardLink
                    to="/"
                    onClick={event => {
                      event.preventDefault();
                      onClickFolder(folder);
                    }}
                  >
                    <Flex as="h2" direction="column" alignItems="start">
                      <CardTitle>
                        {folder.name}
                        <VisuallyHidden>:</VisuallyHidden>
                      </CardTitle>

                      <Typography as="span" textColor="neutral600" variant="pi" ellipsis>
                        {folder.children.count} folder, {folder.files.count} assets
                      </Typography>
                    </Flex>
                  </FolderCardLink>
                </FolderCardBody>
              </FolderCard>
            </GridItem>
          );
        })}
      </Grid>
    </KeyboardNavigable>
  );
};

FolderList.defaultProps = {
  onEditFolder: null,
  onSelectFolder: null,
  size: 'M',
  selectedFolders: [],
  title: null,
};

FolderList.propTypes = {
  folders: PropTypes.arrayOf(FolderDefinition).isRequired,
  size: PropTypes.oneOf(['S', 'M']),
  selectedFolders: PropTypes.array,
  onClickFolder: PropTypes.func.isRequired,
  onEditFolder: PropTypes.func,
  onSelectFolder: PropTypes.func,
  title: PropTypes.string,
};